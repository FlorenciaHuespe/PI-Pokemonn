import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedType,
  getTypes,
  setSelectedSource,
  setSortingOrder,
  setAttackSortingOrder,
  setCurrentPage,
} from '../../redux/actions';
import styles from './filter.module.css';

const Filters = () => { //useSelector permitira acceder al estado
  const dispatch = useDispatch(); 
  const selectedType = useSelector((state) => state.selectedType); 
  const types = useSelector((state) => state.types); 
  const selectedSource = useSelector((state) => state.selectedSource); 
  const sortingOrder = useSelector((state) => state.sortingOrder); 
  const attackSortingOrder = useSelector((state) => state.attackSortingOrder); 
  const currentPage = useSelector((state) => state.currentPage); 

  useEffect(() => { 
    dispatch(getTypes()); 
  }, [dispatch]); 

  const handleTypeChange = (event) => { //  cambia el tipo de pokemon
    const selectedType = event.target.value;
    dispatch(setSelectedType(selectedType)); 
    dispatch(setCurrentPage(1)); 
  };

  const handleSourceChange = (event) => { //  cambiar si pokemon es de BD o API
    const selectedSource = event.target.value; 
    dispatch(setSelectedSource(selectedSource)); 
    dispatch(setCurrentPage(1));
  };

  const handleNameOrderChange = (event) => { // cambiar el orden de los pokemon x nombre de A Z ZA
    const sortingOrder = event.target.value; 
    dispatch(setSortingOrder(sortingOrder)); 
    dispatch(setCurrentPage(1)); 
  };

  const handleAttackOrderChange = (event) => { //cambiar el orden de los pokemon x ataque Min - Max o Max - Min
    const sortingOrder = event.target.value;  
    dispatch(setAttackSortingOrder(sortingOrder));
    dispatch(setCurrentPage(1)); 
  };
//reiniciar los filtros
  const handleResetFilters = () => {
    dispatch(setSelectedType(''));
    dispatch(setSelectedSource(''));
    dispatch(setSortingOrder(''));
    dispatch(setAttackSortingOrder(''));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.filtersContainer}>
{/* selecciona el tipo de pokemon */}
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Filter by Type</h2>
        <select className={styles.select} value={selectedType} onChange={handleTypeChange}>  
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
{/* selecciona si es de BD o API */}
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Filter by Source</h2>
        <select className={styles.select} value={selectedSource} onChange={handleSourceChange}>
          <option value="">All Sources</option>
          <option value="API">From API</option>
          <option value="BD">From BD</option>
        </select>
      </div>
{/* selecciona el orden x nombre */}
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Sort by Name</h2>
        <select className={styles.select} value={sortingOrder} onChange={handleNameOrderChange}> 
          <option value="">No Sorting</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z- A</option>
        </select>
      </div>
{/* selecciona el orden x ataque */}
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Sort by Attack</h2>
        <select className={styles.select} value={attackSortingOrder} onChange={handleAttackOrderChange}>
          <option value="">No Sorting</option>
          <option value="asc">Min - Max</option>
          <option value="desc">Max - Min</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
      <span onClick={handleResetFilters} className={styles.reset}>Reset Filters</span> {/* reinicia los filtros */}
            </div>
      <div className={styles.filterGroup}>
        <span className={styles.currentPage}>Page: {currentPage}</span>  {/*muestra pagina actual */}
      </div>
    </div>
  );
};

export default Filters;