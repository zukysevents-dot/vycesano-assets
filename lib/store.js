const processedOrders = new Set();

export function isProcessed(orderCode) {
  return processedOrders.has(orderCode);
}

export function markProcessed(orderCode) {
  processedOrders.add(orderCode);
}
