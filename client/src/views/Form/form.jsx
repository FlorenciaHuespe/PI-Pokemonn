import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./form.module.css";
import { Link} from "react-router-dom/cjs/react-router-dom.min";

const Form = () => {
    const [pokemonForm, setPokemonForm] = useState({
          name: "",
          image: "",
          hp: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          types: [],
        });

    const [errors, setErrors] = useState({ // Estado inicial de errores
          name: "",
          image: "",
          hp: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          types: [],
        });

    const resetForm = () => { 
        setPokemonForm({
              name: "",
              image: "",
              hp: "",
              attack: "",
              defense: "",
              speed: "",
              height: "",
              weight: "",
              types: [],
            });   
            setErrors({
                name: "",
                image: "",
                hp: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                types: [],
              });
            };

            const [typeOptions, setTypeOptions] = useState([]); // Estado inicial pokemon types
            console.log("typeOptions:", typeOptions)
            const [submitEnabled, setSubmitEnabled] = useState(false);  // Estado inicial del botón de submit
            const [success, setSuccess] = useState(false); // Estado inicial si pokemon se creó correctamente
          
            useEffect(() => { // Obtener los tipos de pokemon
              axios.get("http://localhost:3001/pokemons/types")
                .then((response) => {
                  setTypeOptions(response.data.map((type) => type.name));
                })
                .catch(() => {
                  alert("Error al recuperar tipos");
                });
            }, []);
          
            useEffect(() => { // Validar el formulario
              validate(pokemonForm);
            }, [pokemonForm]); // array  que escucha los cambios en el formulario
          
            useEffect(() => { // Habilitar el botón de submit
              const hasErrors = Object.values(errors).some((error) => error !== ""); // Si hay errores, deshabilitar el botón de submit
              setSubmitEnabled(!hasErrors && Object.values(pokemonForm).every(value => value !== '')); // Si no hay errores y todos los campos están completos, habilitar el botón de submit
            }, [errors, pokemonForm]); // array  que escucha los cambios en los errores y el formulario
          
            const handleChange = (e) => { // Manejar los cambios en el formulario
              setPokemonForm({ ...pokemonForm, [e.target.name]: e.target.value }); // Actualizar el formulario con los nuevos valores
            };
          
            const validate = (pokemonForm) => {  // Validar el formulario
              const compiledErrors = {}; // Objeto que contendrá los errores
          
              if (pokemonForm.name && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,15}$/.test(pokemonForm.name)) { // Valida el nombre 
                compiledErrors.name = "Introduzca un nombre utilizando letras de la A a la Z (min 3 caracteres, max 15 caracteres)";
              } else {
                compiledErrors.name = "";
              }
          
              if (pokemonForm.image && !/\bhttps?:\/\/\S+\.(png|jpe?g)\b/.test(pokemonForm.image)) { // Valida tipo de imagen
                compiledErrors.image = "El formato de URL no es válido";
              } else {
                compiledErrors.image = "";
              }
          
              if (pokemonForm.hp && !/^[0-9]{1,3}$/.test(pokemonForm.hp)) { 
                compiledErrors.hp = "Introduce un número (max 3 dígitos)";
              } else {
                compiledErrors.hp = "";
              }
          
              if (pokemonForm.attack && !/^[0-9]{1,3}$/.test(pokemonForm.attack)) { 
                compiledErrors.attack = "Introduce un número (max 3 dígitos)";
              } else {
                compiledErrors.attack = "";
              }
          
              if (pokemonForm.defense && !/^[0-9]{1,3}$/.test(pokemonForm.defense)) { 
                compiledErrors.defense = "Introduce un número (max 3 dígitos)";
              } else {
                compiledErrors.defense = "";
              }
          
              if (pokemonForm.speed && !/^[0-9]{1,3}$/.test(pokemonForm.speed)) {
                compiledErrors.speed = "Introduce un número (max 3 dígitos)";
              } else {
                compiledErrors.speed = "";
              }
          
              if (pokemonForm.height && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.height)) { 
                compiledErrors.height = "Debe introducir un numero";
              } else {
                compiledErrors.height = "";
              }
          
              if (pokemonForm.weight && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.weight)) { 
                compiledErrors.weight = "Seleccione al menos un tipo";
              } else {
                compiledErrors.weight = "";
              }
          
              if (pokemonForm.types.length === 0) {
                compiledErrors.types = "Seleccione al menos un tipo";
              } else {
                compiledErrors.types = "";
              }
          
              setErrors(compiledErrors);  // Actualizar los errores
            };
          
            const handleTypeChange = (e) => { // Manejar los cambios en los tipos
              const { name, checked } = e.target;
              let selectedOptions = [...pokemonForm.types];
          
              if (checked) { // Si el tipo está seleccionado, agregarlo 
                selectedOptions.push(name);
              } else {
                selectedOptions = selectedOptions.filter((option) => option !== name); // Si el type no se selecciono, eliminarlo del array
              }
          
              setPokemonForm({ // Actualizar los tipos
                ...pokemonForm, 
                types: selectedOptions,
              });
            };
          
            const handleSubmit = (e) => { // Manejar el submit del formulario
              e.preventDefault();
              if (submitEnabled && !errors.types) { 
                axios.post("/pokemons", pokemonForm)
                  .then(() => {
                    setSuccess(true); // Si  se creó, muestra mensaje de éxito
                    resetForm(); // Reiniciar el formulario
                  })
                  .catch(() => {
                    setSuccess(false); // Si no se creó, muestra mensaje de error
                  });
              }
            };
          
            return (
              <div className={styles.Form}>
                <div>
                <Link className={styles.link} to="/home">Home</Link>
            </div>
                <h1>Create a Pokemon</h1>
                <div className={styles.FormContainer}>
                  <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={pokemonForm.name}
                      placeholder=" Insert Name"
                      onChange={handleChange}
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
          
                    <label className={styles.label}>Image</label>
                    <input
                      type="text"
                      name="image"
                      value={pokemonForm.image}
                      placeholder="Insert URL Image"
                      onChange={handleChange}
                    />
                    {errors.image && <span className={styles.error}>{errors.image}</span>}
          
                    <label className={styles.label}>HP</label>
                    <input
                      type="text"
                      name="hp"
                      value={pokemonForm.hp}
                      placeholder=" Insert HP"
                      onChange={handleChange}
                    />
                    {errors.hp && <span className={styles.error}>{errors.hp}</span>}
          
                    <label className={styles.label}>Attack</label>
                    <input
                      type="text"
                      name="attack"
                      value={pokemonForm.attack}
                      placeholder=" Insert Attack"
                      onChange={handleChange}
                    />
                    {errors.attack && <span className={styles.error}>{errors.attack}</span>}
          
                    <label className={styles.label}>Defense</label>
                    <input
                      type="text"
                      name="defense"
                      value={pokemonForm.defense}
                      placeholder=" Insert Defense"
                      onChange={handleChange}
                    />
                    {errors.defense && <span className={styles.error}>{errors.defense}</span>}
          
                    <label className={styles.label}>Speed</label>
                    <input
                      type="text"
                      name="speed"
                      value={pokemonForm.speed}
                      placeholder="Insert Speed"
                      onChange={handleChange}
                    />
                    {errors.speed && <span className={styles.error}>{errors.speed}</span>}
          
                    <label className={styles.label}>Height</label>
                    <input
                      type="text"
                      name="height"
                      value={pokemonForm.height}
                      placeholder=" Insert Height"
                      onChange={handleChange}
                    />
                    {errors.height && <span className={styles.error}>{errors.height}</span>}
          
                    <label className={styles.label}>Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={pokemonForm.weight}
                      placeholder=" Insert Weight"
                      onChange={handleChange}
                    />
                    {errors.weight && <span className={styles.error}>{errors.weight}</span>}
          
                    <label className={styles.label}>Pokemon Types</label>
          <div className={styles.typesContainer}>
            {typeOptions.map((type) => (
              <label key={type} className={styles.typesContainer}>
                <input
                  type="checkbox"
                  name={type}
                  checked={pokemonForm.types.includes(type)} // Si el tipo está seleccionado, marcarlo
                  onChange={handleTypeChange}
                />
                {type} 
              </label>
            ))}
            {errors.types && <span className={styles.error}>{errors.types}</span>} {/* Si hay errores mostrar mensaje  */}
                    </div>
          
                    {submitEnabled ? ( // Si el submit está habilitado, mostrar el botón de submit
                      <button type="submit" className={styles.submitButton}>
                        Create Pokemon
                      </button>
                    ) : (
                      <span className={styles.error}>Para continuar debe rellenar todos los campos obligatorios </span> 
                    )}
          
                    {success && <span className={styles.success}>¡Pokémon creado!</span>} 
                  </form>
                </div>
              </div>
            );
          }
          
          export default Form;




          //287  {/* Si el pokemon se creó correctamente, mostrar mensaje de éxito */}
          //284// Si el submit no está habilitado, mostrar mensaje de error