package com.company;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Postgres {
    private static Connection connection;

    private static void connect() throws SQLException {
        connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/sample_database");
    }

    static void addTodo(String todo) throws SQLException {
        connect();
        String query = "SELECT add_todo(?);";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setString(1, todo);
        statement.execute();
        statement.close();
        connection.close();
    }

    static List<String> getTodos() throws SQLException {
        List<String> todos = new ArrayList<>();
        connect();
        String query = "SELECT * FROM view_todos;";
        PreparedStatement statement = connection.prepareStatement(query);
        ResultSet rs = statement.executeQuery();
        while (rs.next()) todos.add(rs.getString("todo_value"));
        statement.close();
        connection.close();
        return todos;
    }

    static void deleteAllTodos() throws SQLException {
        connect();
        String query = "DELETE FROM todos;";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.executeUpdate();
        statement.close();
        connection.close();
    }
}
