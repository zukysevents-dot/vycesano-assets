export default async function handler(req, res) {

  const xmlUrl =
    "https://www.vycesano.cz/export/orders.xml?patternId=-11&partnerId=2&hash=4f207e0d635aee2427914be99b0c41b5ef2b23331eb13bc6636b0c30c3529334";

  try {

    const xmlResponse = await fetch(xmlUrl);
    const xml = await xmlResponse.text();

    // jen test
    console.log(xml);

    return res.status(200).json({
      success: true,
      message: "XML loaded successfully",
      length: xml.length
    });

  } catch (e) {

    return res.status(500).json({
      success: false,
      error: e.toString()
    });

  }
}
