import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src="/hero-gradient.png"
                width={1390}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          <div className={styles.heroAssetFrame}>
            <Image
              src="/spiderman.png"
              width={450}
              height={540}
              alt="Hero asset, NFT marketplace"
              quality={100}
              className={styles.heroAsset}
            />
            <Image
              src="/spiderman.png"
              width={600}
              height={500}
              alt="Prince"
              quality={100}
              className={styles.gradient}
            />
            <Image
              src="/botanixspider.png"
              width={450}
              height={540}
              alt="Background gradient from red to blue"
              quality={100}
              // className={styles.gradient}
            />
          </div>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  Botanix&apos;s Genesis NFT Marketplace
                </span>
                <br />
              </h1>
              <h2>
                Trade Unique Premium NFT Collections on Botanix&apos;s First ever NFT
                Marketplace 🌐
              </h2>
              <br />
            </div>
          </div>
        </div>
        <div className="text-center mx-56">
          <p className={styles.heroSubtitle}>
            Seamlessly trade, collect, and explore unique NFTs Unlock the potential of your idle Bitcoin by engaging with the Genesis NFT Marketplace
          </p>
          <div className={styles.heroCtaContainer}>
            <Link className={styles.heroCta} href="/buy">
              Get Started
            </Link>
            <Link
              className={styles.secondaryCta}
              href="https://github.com/kamalbuilds/Botanix-Premium-NFT-Marketplace"
              target="_blank"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
