import style from "./formSearch.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { useSearchContext } from "../../contexts/SearchContext";

export function FormSearch() {
  const SearchContext = useSearchContext();
  const url = useRef<HTMLInputElement>(null);
  const client = useRef<HTMLInputElement>(null);
  const keywords = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({
    url: null,
    client: null,
    keywords: null,
  });

  useEffect(() => {
    if (SearchContext.search.status === "error") {
      const { url, keywords, client } = SearchContext.search;
      sendSearch(url, client, keywords);
    }
  }, [SearchContext.search]);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!url.current.value || /\/|http?s|www/.test(url.current.value))
      return setErrors({ ...errors, url: true });
    if (!client.current.value) return setErrors({ ...errors, client: true });
    if (!keywords.current.value)
      return setErrors({ ...errors, keywords: true });

    SearchContext.setSearch({
      client: client.current.value,
      url: url.current.value,
      keywords: keywords.current.value.split(/\r?\n/),
      status: "runing",
    });

    await sendSearch(
      url.current.value,
      client.current.value,
      keywords.current.value.split(/\r?\n/)
    );
  };

  const sendSearch = async (
    url: string,
    client: string,
    keywords: string[]
  ) => {
    await ApiService.post("/search", {
      url,
      client,
      keywords,
    });
  };

  return (
    <div className={style.formContent}>
      <h3>Nova busca</h3>
      <form onSubmit={handleFormSubmit}>
        <div className={style.allInputs}>
          <TextField
            id="site-adress"
            label="Endereço do Site"
            variant="standard"
            inputRef={url}
            error={errors.url}
            onChange={() => setErrors({ ...errors, url: null })}
            helperText={
              errors.url
                ? "Inválido. Insira como no exemplo: example.com.br"
                : "Somente o endereço principal, ex: example.com.br"
            }
          />
          <TextField
            id="name-client"
            label="Nome do Cliente"
            variant="standard"
            inputRef={client}
            onChange={() => setErrors({ ...errors, client: null })}
            error={errors.client}
          />
          <TextField
            placeholder="Palavras Chave"
            multiline
            inputRef={keywords}
            className={style.lastInput}
            minRows={3}
            maxRows={12}
            onChange={() => setErrors({ ...errors, keywords: null })}
            error={errors.keywords}
            helperText="Insira as palavras-chave uma abaixo da outra."
          />
        </div>

        <Button variant="contained" type="submit">
          Iniciar busca
        </Button>
      </form>
    </div>
  );
}
