package com.company;

import com.google.gson.Gson;

import static spark.Spark.*;


public class Spark {
    public static void main(String[] args) {
        cors();

        get("/todos", (req, res) -> new Gson().toJson(Postgres.getTodos()));
        post("deletetodos", (req, res) -> {
            Postgres.deleteAllTodos();
            res.status(204);
            return "";
        });

        post("addtodo/:todo", (req, res) -> {
            Postgres.addTodo(req.params().get(":todo"));
            res.status(204);
            return "";
        });

        System.out.println("\nDatabase Server Connected!");
    }
    static void cors() {
        options("/*",
                (request, response) -> {

                    String accessControlRequestHeaders = request
                            .headers("Access-Control-Request-Headers");
                    if (accessControlRequestHeaders != null) {
                        response.header("Access-Control-Allow-Headers",
                                accessControlRequestHeaders);
                    }

                    String accessControlRequestMethod = request
                            .headers("Access-Control-Request-Method");
                    if (accessControlRequestMethod != null) {
                        response.header("Access-Control-Allow-Methods",
                                accessControlRequestMethod);
                    }

                    return "OK";
                });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    }
}
