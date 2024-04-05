import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/marketplace.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/buy" className={styles.link}>
              Buy
            </Link>
            <Link href="/sell" className={styles.link}>
              Sell
            </Link>
            <Link href="/rent" className={styles.link}>
              Rent
            </Link>
            <Link href="/mint" className={styles.link}>
              Mint
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle={"Enter Botanix-Genesis-Marketplace"} 
            welcomeScreen={{
              img: {
                src: "/genesis-marketplace.png",
                width: 350,
                height: 300,
              },
              title:
                "Your Entry to the world of BitcoinL2 with Botanix",
              subtitle: "Connect Wallet to enter 🎉",
            }}
            />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src="/spider.png"
                width={42}
                height={62}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
