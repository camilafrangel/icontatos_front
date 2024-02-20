import styles from "./page.module.css";
import Dashboard from "../components/dashboard/dashboard";

async function getContacts() {
  const apiUrl = process.env.API_URL
  try {
      const res = await fetch(`${apiUrl}/api/contacts`, {
          cache: "no-store"
      })

      if (!res.ok) {
          throw new Error('Failed to fetch Contacts')
      }

      return res.json();
  } catch (error) {
      console.log("Error:", error)
  }
}

export default async function Home() {
  const { contacts } = await getContacts();

  return (
    <main className={styles.main}>
      <Dashboard contacts={contacts}/>
    </main>
  );
}
