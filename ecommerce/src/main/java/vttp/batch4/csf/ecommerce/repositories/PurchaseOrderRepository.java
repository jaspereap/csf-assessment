package vttp.batch4.csf.ecommerce.repositories;

import java.sql.SQLDataException;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) throws SQLException {
    // TODO Task 3
    String INSERT_ORDER = """
        insert into orders values (?, ?, ?, ?, ?, ?)
        """;
    int updated = template.update(INSERT_ORDER, 
      order.getOrderId(), 
      order.getDate(), 
      order.getName(), 
      order.getAddress(), 
      order.getPriority(), 
      order.getComments());
    if (updated != 1) {
      throw new SQLDataException("Operation failed");
    }
    System.out.println("Inserted rows: " + updated);
  }
}
