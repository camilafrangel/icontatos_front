import styles from "./page.module.css";
import Contacts from "../components/contacts/contacts";

export default function Home() {
  return (
    <main className={styles.main}>
      <Contacts/>
    </main>
  );
}
