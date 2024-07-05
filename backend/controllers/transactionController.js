const axios = require("axios");
const Transaction = require("../models/Transaction");

const initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.insertMany(data);
    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listTransactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const query = { dateOfSale: { $regex: `^2022-${month}` } };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { price: { $regex: search, $options: "i" } },
      ];
    }
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `^2022-${month}` } };
    const totalSaleAmount = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const soldItems = await Transaction.countDocuments({
      ...query,
      sold: true,
    });
    const notSoldItems = await Transaction.countDocuments({
      ...query,
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      soldItems,
      notSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `^2022-${month}` } };
    const ranges = [
      { $range: [0, 100], count: 0 },
      { $range: [101, 200], count: 0 },
      { $range: [201, 300], count: 0 },
      { $range: [301, 400], count: 0 },
      { $range: [401, 500], count: 0 },
      { $range: [501, 600], count: 0 },
      { $range: [601, 700], count: 0 },
      { $range: [701, 800], count: 0 },
      { $range: [801, 900], count: 0 },
      { $range: [901, Infinity], count: 0 },
    ];
    const transactions = await Transaction.find(query);
    transactions.forEach((transaction) => {
      ranges.forEach((range) => {
        if (
          transaction.price >= range.$range[0] &&
          transaction.price < range.$range[1]
        ) {
          range.count += 1;
        }
      });
    });
    res.status(200).json(ranges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `^2022-${month}` } };
    const categories = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCombinedData = async (req, res) => {
  try {
    const statistics = await getStatistics(req, res);
    const barChartData = await getBarChartData(req, res);
    const pieChartData = await getPieChartData(req, res);

    res.status(200).json({
      statistics,
      barChartData,
      pieChartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
};
