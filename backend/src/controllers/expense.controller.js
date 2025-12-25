export const getExpenses = (req, res) => {
  const { groupId } = req.params;
  res.json({ message: `Get expenses for group ${groupId}` });
};

export const createExpense = (req, res) => {
  res.json({ message: 'Create expense' });
};