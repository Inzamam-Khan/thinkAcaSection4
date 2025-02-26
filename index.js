app.get("/orders", async (req, res) => {
    try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        
        if (page < 1 || limit < 1) {
            return res.status(400).json({ success: false, message: "Invalid Parameters" });
        }

        
        const ordersQuery = `
            SELECT id, user_id, total_price, status, created_at 
            FROM orders 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;
        
        
        const { rows } = await db.query(ordersQuery, [limit, offset]);

        
        res.status(200).json({ success: true, orders: rows });
    } catch (error) {
        console.error("Error in fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
