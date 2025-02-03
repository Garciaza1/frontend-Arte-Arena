"use client";
import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import api from "../service/api";

const ItemForm = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  // Ficou tudo em um arquivo só pois não seria tão pratico distribuir os metodos por conta do snackbar MUI. 
  // Outros metodos estão na pasta service no bacnend do Next.js para segunrança do App.
  // Busca os itens da API
  const fetchItems = async (search = "") => {
    setLoading(true);
    try {
      const response = await api.get("/items", {
        params: {
          title: search,
        },
      });
      setOptions(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      setSnackbarMessage("Erro ao buscar itens.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os itens ao montar o componente
  useEffect(() => {
    fetchItems();
  }, []);

  // Adiciona um novo item
  const handleAddItem = async () => {
    if (!inputValue.trim()) {
      setSnackbarMessage("O título não pode estar vazio.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/items", {
        title: inputValue,
        body: "bla bla bla bla lorem 1 2 3 4 5",
      });

      // Atualiza a lista de opções
      setOptions((prevOptions) => [response.data, ...prevOptions]);
      setSnackbarMessage("Item adicionado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setInputValue(""); // Limpa o campo de entrada
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      setSnackbarMessage("Erro ao adicionar item.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Fecha o Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSelect = (event, newValue) => {
    setSelectedItemId(newValue.id);
  };

  const selectedItem = options?.find((option) => option.id === selectedItemId) || "";


  const OutputValue = selectedItem ? (
    <div>
      <h3><span className="font-bold">Titulo:</span> {selectedItem.title}</h3>
      <p><span className="font-bold">Descrição:</span> {selectedItem.body}</p>
    </div>
  ) : (
    <div>Nenhum item selecionado</div>
  );

  return (
    <div className="">
      <Autocomplete
        style={{ backgroundColor: "", color: "Highlight" }}
        options={options}
        getOptionLabel={(option) => option.title || ""}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          fetchItems(newInputValue);
        }}
        loading={loading}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar ou adicionar item"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        noOptionsText={
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            disabled={loading}
          >
            Adicionar "{inputValue}"
          </Button>
        }
      />

      {/* Snackbar para feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="bg-black p-20 text-black">{OutputValue}</div>
    </div>
  );
};

export default ItemForm;

