import styles from "./DateFilter.module.css";

interface Props {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export default function DateFilter({ selectedDate, setSelectedDate }: Props) {
  return (
    <input
      type="date"
      aria-label="Filtrar pedidos por data"
      title="Escolha a data para filtrar pedidos"
      placeholder="Selecione a data"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className={styles.input}
    />
  );
}
