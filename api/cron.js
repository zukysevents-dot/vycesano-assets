import { XMLParser } from "fast-xml-parser";
import { isProcessed, markProcessed } from "../lib/store.js";

const SHOPTET_XML_URL =
  "https://www.vycesano.cz/export/orders.xml?patternId=-11&partnerId=2&hash=4f207e0d635aee2427914be99b0c41b5ef2b23331eb13bc6636b0c30c3529334";

const PET_API_URL = "https://api.pet-distributor.cz/v1/orders";

const PET_API_TOKEN =
  "W1WqwGxucGdcneYK1VIH7DkxVtiRRSUN";

export default async function handler(req, res) {

  try {

    console.log("Loading XML feed...");

    const xmlResponse = await fetch(SHOPTET_XML_URL);

    if (!xmlResponse.ok) {
      throw new Error("Cannot load XML feed");
    }

    const xml = await xmlResponse.text();

    const parser = new XMLParser({
      ignoreAttributes: false
    });

    const parsed = parser.parse(xml);

    console.log("XML parsed");

    let orders = parsed?.ORDERS?.ORDER || [];

    if (!Array.isArray(orders)) {
      orders = [orders];
    }

    const results = [];

    for (const order of orders) {

      const orderCode = order?.CODE;

      if (!orderCode) {
        continue;
      }

      if (isProcessed(orderCode)) {

        console.log(`Skipping duplicate: ${orderCode}`);

        results.push({
          order: orderCode,
          status: "duplicate"
        });

        continue;
      }

      console.log(`Processing order: ${orderCode}`);

      let items = order?.ITEMS?.ITEM || [];

      if (!Array.isArray(items)) {
        items = [items];
      }

      const payload = {
        order_number: orderCode,
        customer: {
          first_name: order?.BILLING_ADDRESS?.NAME || "",
          last_name: "",
          email: order?.EMAIL || "",
          phone: order?.PHONE || ""
        },
        shipping_address: {
          street: order?.DELIVERY_ADDRESS?.STREET || "",
          city: order?.DELIVERY_ADDRESS?.CITY || "",
          zip: order?.DELIVERY_ADDRESS?.ZIP || "",
          country: order?.DELIVERY_ADDRESS?.COUNTRY || "CZ"
        },
        items: items.map((item) => ({
          sku: item?.CODE || "",
          quantity: Number(item?.AMOUNT || 1)
        }))
      };

      console.log("Sending to Pet Distributor API");

      const apiResponse = await fetch(PET_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${PET_API_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      const apiText = await apiResponse.text();

      console.log(apiText);

      if (!apiResponse.ok) {

        results.push({
          order: orderCode,
          status: "failed",
          response: apiText
        });

        continue;
      }

      markProcessed(orderCode);

      results.push({
        order: orderCode,
        status: "sent"
      });

    }

    return res.status(200).json({
      success: true,
      processed: results
    });

  } catch (e) {

    console.error(e);

    return res.status(500).json({
      success: false,
      error: e.toString()
    });

  }

}
