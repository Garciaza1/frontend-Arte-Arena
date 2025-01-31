const createItem = async (newItem) => {
    try {
      const response = await api.post("/items", newItem);
      console.log("Item criado:", response.data);
    } catch (error) {
      console.error("Erro ao criar item:", error);
    }
  };
  
  // Exemplo de uso:
  createItem({ title: "Novo Item", description: "Descrição do item" });
  