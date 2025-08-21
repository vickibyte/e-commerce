// DB Spreadsheet

const { MongoClient } = require("mongodb");
const XLSX = require("xlsx");

async function exportToExcel() {
  const uri = "mongodb://127.0.0.1:27017"; // your local MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("ecommerceDB");

    // Fetch data from collections
    const users = await db.collection("users").find().toArray();
    const products = await db.collection("products").find().toArray();

    // Convert MongoDB data to JSON for Excel
    const usersSheet = XLSX.utils.json_to_sheet(users);
    const productSheet = XLSX.utils.json_to_sheet(products);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, usersSheet, "Users");
    XLSX.utils.book_append_sheet(workbook, productSheet, "Products");

    // Write to Excel file
    XLSX.writeFile(workbook, "ecommerce_data.xlsx");
    console.log("Export completed! File: ecommerce_data.xlsx");

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

exportToExcel();
