package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonValue;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@RestController
@RequestMapping(path = "/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path = "/order")
  public ResponseEntity<String> postOrder(@RequestBody String order) {
    // TODO Task 3

    JsonObject orderObj = Json.createReader(new StringReader(order)).readObject();
    String name = orderObj.getString("name");
    String address = orderObj.getString("address");
    boolean priority = orderObj.getBoolean("priority");
    String comments = orderObj.getString("comments");
    Cart cart = new Cart();

    for (JsonValue item : orderObj.getJsonObject("cart").getJsonArray("lineItems")) {
      LineItem lineItem = new LineItem();

      JsonObject itemObj = item.asJsonObject();
      String prodId = itemObj.getString("prodId");
      Integer quantity = itemObj.getInt("quantity");
      String productName = itemObj.getString("name");
      Integer price = itemObj.getInt("price");
      lineItem.setProductId(prodId);
      lineItem.setQuantity(quantity);
      lineItem.setName(productName);
      lineItem.setPrice(price);

      cart.addLineItem(lineItem);
    }

    Order _order = new Order();
    _order.setAddress(address);
    _order.setCart(cart);
    _order.setComments(comments);
    _order.setName(name);
    _order.setPriority(priority);
    System.out.println("Order:>>>>> " + _order);

    try {
      poSvc.createNewPurchaseOrder(_order);
    } catch (SQLException e) {
      JsonObject response = Json.createObjectBuilder().add("message", e.getMessage()).build();
      return ResponseEntity.status(HttpStatusCode.valueOf(400)).body(response.toString());
    }
    JsonObject successResponse = Json.createObjectBuilder().add("orderId", _order.getOrderId()).build();
	 return ResponseEntity.ok(successResponse.toString());
  }
}
