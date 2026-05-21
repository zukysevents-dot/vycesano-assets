export default async function handler(req, res) {
  try {
    const order = req.query;

    const payload = {
      terms_conditions: true,
      join_orders: false,
      dropshipping: true,
      delivery_id: 1,
      payment_id: 1,

      client_order_number: order.order || "unknown",

      billing_first_name: order.first_name || "",
      billing_last_name: order.last_name || "",
      billing_city: order.city || "",
      billing_postcode: order.zip || "",
      billing_address: order.address || "",
      billing_phone: order.phone || "",
      billing_email: order.email || "",

      delivery_equal_billing: true,

      order_items: [
        {
          code: order.sku || "",
          quantity: 1
        }
      ]
    };

    const response = await fetch(
      "https://api.pet-distributor.cz/v1/orders/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "Bearer W1WqwGxucGdcneYK1VIH7DkxVtiRRSUN"
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.text();

    return res.status(200).json({
      success: true,
      petDistributor: data
    });

  } catch (err) {
    return res.status(500).json({
      error: err.toString()
    });
  }
}
