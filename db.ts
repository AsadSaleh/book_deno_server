import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
// import "https://deno.land/x/denv/mod.ts";

// Initialize the plugin
await init();

class DB {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
    console.log("THIS IS THE dbName:", dbName);
    console.log("THIS IS THE url:", url);
  }
  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }
  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

// const dbName = Deno.env.get("DB_NAME") || "deno_demo";
// const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
const dbName = "deno_db";
const dbHostUrl =
  "mongodb+srv://admin:yangitumasalupa@cluster0-vvvpp.gcp.mongodb.net/test?retryWrites=true&w=majority";
const db = new DB(dbName, dbHostUrl);
db.connect();

export default db;
