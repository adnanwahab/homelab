import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function About() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>About Us</h1>
        
        <div className={styles.content}>
          <p className={styles.description}>
            Welcome to our platform! We're dedicated to creating amazing experiences.
          </p>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Our Mission</h2>
              <p>To provide exceptional value through innovative solutions.</p>
            </div>
            
            <div className={styles.card}>
              <h2>Our Vision</h2>
              <p>Building the future of technology, one step at a time.</p>
            </div>
          </div>
        </div>

        <p className={styles.backLink}>
          <Link href="/home">&larr; Back to Home</Link>
        </p>
      </main>
    </div>
  );
}
