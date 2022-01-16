import { useState } from "react";
import { Formik, Form, Field } from "formik";
import lupa from "./images/buscar.png";
import "./header.css";
import "./content.css";
import "./article.css";

const App = () => {
  //guarda fotos, resultados de la api de unsplash
  const [photos, setPhotos] = useState([]);

  //abre en una pestaña nueva la foto
  const open = (url) => window.open(url);
  console.log({ photos });

  return (
    <div>
      <header>
        <h1>Image Search</h1>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID 3cCUGhx9VFcpPh7NAfH7LDQVYGPgmFh1hFWiYzRqzOc",
                },
              }
            );
            const data = await response.json();
            //llamar API unsplash
            console.log(data);
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
            <img src={lupa} alt="lupa" className="lupa" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
