import { generateToken } from 'backend/gopostoken.web.js';
import { itemStock } from 'backend/goposstockapi.web.js';
import wixData from "wix-data";

$w.onReady(async function () {
  updateIndicator(); // call once
  async function updateIndicator() {
        try {
            // Query the Stock collection
            let result = await wixData.query("Stock").find();

            if (result.items.length > 0) {
                let value = result.items[0].Stock;
                //console.log("Amount", value);

                // Ensure value is within the range
                if (value < 0) value = 0;
                if (value > 150) value = 150;

                // Send the value to the custom HTML element
                let htmlComponent = $w("#html2"); 
                htmlComponent.postMessage({
                    type: 'updatePosition',
                    value: value
                });
            } else {
                console.log("No items found in Stock collection.");
            }
        } catch (error) {
            console.error("Error querying Stock collection:", error);
        }
    }


	async function addStockItem(itemName, stock) {
    
    let newStock = {
        "Item": itemName,  
        "Stock": stock,
    };

    try {
        
        let entry = await wixData.insert("Stock", newStock);
        console.log("New stock item inserted successfully:", entry);
        return entry;
    } catch (error) {
        console.error("Failed to insert new stock item:", error);
        throw error; 
    }
}

async function fetchAndInsertStockItems() {
    try {
        
        const token = await generateToken(); 
        const response = await itemStock(token); 
        const items = response.data;
        //console.log(items);
        
        // for (const item of items) { // when multiple items
            const itemName = items.name;
            const stockAmount = items.stock_info?.stock_amount ?? "Not set"; 
            
            //console.log(`Item Name: ${itemName}`);
            //console.log(`Stock Amount: ${stockAmount}`);
             await addStockItem(itemName, stockAmount);
        // }

        //console.log("All stock items inserted successfully.");
    } catch (error) {
        // Handle errors during fetching or inserting items
        console.error("Error during fetch and insert process:", error);
    }
}

async function deleteAllItemsInCollection(collectionName) {
	let totalDeleted = 0;

    try {
        let result;
        do {
           
            result = await wixData.query(collectionName).find();

            let items = result.items;
            //console.log(`Fetched ${items.length} items to delete.`);

            for (let item of items) {
                await wixData.remove(collectionName, item._id);
                totalDeleted++;     
            }
        } while (result.items.length > 0);

        //console.log(`Successfully deleted ${totalDeleted} items from collection: ${collectionName}`);
    } catch (error) {
        console.error(`Failed to delete items from collection: ${collectionName}`, error);
        throw error;
    }
}

//deleteAllItemsInCollection("Stock");

function deleteAndInsert() {
    deleteAllItemsInCollection("Stock");
    fetchAndInsertStockItems();
	console.log("Stock Updated");
    updateIndicator();
}

// To update the indicator dynamically
setInterval(deleteAndInsert, 5000);

});
