import React from 'react';
import styles from '@/styles/home.module.scss';

import { useRouter } from 'next/router';
import Coins3d from '@/components/Coins3d';

const Home: React.FC = () => {
    const router = useRouter();

    return (
        <main className={styles.main}>
            <section className={styles.hero}>

                <div>
                    <h1>Virtual Currency Game</h1>
                    <p>
                        Inspired by Classical Discord Bots like Dank Memer & OwO, Now on the Web.
                        <br />
                        <br />
                        But with a twist. The game is functionally dysfunctional!
                    </p>

                    <button onClick={() => router.push('/game')}>Let's Play!</button>
                </div>

                <div className={styles.modelContainer}>
                    <Coins3d position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} />
                </div>
            </section>
        </main>
    );
};

export default Home;