import AutoCompleteComponent from "../../components/Autocomplete";

export default function Home() {
    return (
        <div className="px-40">
            <h1 className=" font-bold text-center text-2xl py-6 text-black">Buscar Itens</h1>
            <AutoCompleteComponent />
        </div>
    );
}
