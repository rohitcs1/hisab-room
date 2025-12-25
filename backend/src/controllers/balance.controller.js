export const getBalance = (req, res) => {
  const { groupId } = req.params;
  res.json({ message: `Get balance for group ${groupId}` });
};