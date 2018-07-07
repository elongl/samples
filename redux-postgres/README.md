Server Deploy:
```
mvn compile assembly:single
cd target
java -jar postgres-1.0-jar-with-dependencies.jar
```

Client Deploy:
```
yarn
yarn start
```
