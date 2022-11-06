import { useEffect, useState } from "react";
import { nodeURL } from "../../constants";
import { PoR } from "../../types";

export default function Step3({por}: {por: PoR}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

    fetch(`${nodeURL}`, {method: 'POST', body: JSON.stringify(por)})
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      // https://reactjs.org/docs/faq-ajax.html
      (error) => {
        setError(error.message)
        setLoading(false);
      })

  return(<>
    {JSON.stringify(por)}
  </>)
}