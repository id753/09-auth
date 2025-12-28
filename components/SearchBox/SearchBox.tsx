import css from "./SearchBox.module.css";

interface NoteFormProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const SearchBox = ({ onChange, search }: NoteFormProps) => {
  return (
    <div>
      <input
        onChange={onChange}
        defaultValue={search}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
};

export default SearchBox;
