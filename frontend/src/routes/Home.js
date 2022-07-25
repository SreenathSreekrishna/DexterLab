import dexter from '../dexter.png';

const Home = () => {
    return <div className="home">
        <div className="header">
            Your favourite inventions, straight from the lab.
        </div>
        <div className='content'>
            <div className='image'>
                <img src={dexter} alt="A picture of dexter" />
            </div>
            <div className='text'>
                Buy authentic inventions made by Dexter McPherson, our founder and leader, online, hassle-free.
                We are constantly innovating and this is the site in which you will find the latest bleeding-edge tech and gadgets.
            </div>
        </div>
    </div>;
}

export default Home;