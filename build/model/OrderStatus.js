export var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["NonExistent"] = 0] = "NonExistent";
    OrderStatus[OrderStatus["EnqueuedWaiting"] = 1] = "EnqueuedWaiting";
    OrderStatus[OrderStatus["EnqueuedReady"] = 2] = "EnqueuedReady";
    OrderStatus[OrderStatus["ExecutedSucceeded"] = 3] = "ExecutedSucceeded";
    OrderStatus[OrderStatus["ExecutedFailed"] = 4] = "ExecutedFailed";
    OrderStatus[OrderStatus["Canceled"] = 5] = "Canceled";
})(OrderStatus || (OrderStatus = {}));
//# sourceMappingURL=OrderStatus.js.map