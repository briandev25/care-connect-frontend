import HomeFaeturedlist from "./Components/HomeFaeturedlist";
import HomeHeader from "./Components/HomeHeader";
import HomeRegister from "./Components/HomeRegister";
import styles from "./Styles/HomePage.module.css";
import RootLayout from "./(without-layout)/layout";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SearchBar from "./Components/SearchBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div>
        <div className="mb-14">
          <HomeHeader />
        </div>

        <div className="mb-14">
          <HomeFaeturedlist />
        </div>

        <div className="mb-14">
          <HomeRegister />
        </div>

        <div className={styles.searchText}>
          <h1>Find the right Doctor or Hospital</h1>
        </div>
        <div className={styles.SearchFooter}>
          <SearchBar />
        </div>
      </div>
      <Footer />
    </>
  );
}
