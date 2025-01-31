import { useEffect, useState } from "react";
import api from "../services/api";

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/items", {
                    params: {
                        page: page,
                    },
                });
                const newItems = response.data.data;
                setItems((prevItems) => (page === 1 ? newItems : [...prevItems, ...newItems]));
                setHasMore(response.data.current_page < response.data.last_page);
            } catch (error) {
                console.error("Erro ao buscar itens:", error);
            }
        };

        fetchData();
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (hasMore) {
                setPage((prevPage) => prevPage + 1); // Carrega a próxima página
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
            {loading && <li>Carregando...</li>}
        </ul>
    );
};

export default ItemsList;