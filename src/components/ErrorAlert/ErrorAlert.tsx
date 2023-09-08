import './errorAlert.css';

export default function Error() {
    return (
        <section className='error-container'>
            <h2>Oooops! Something went wrong :(</h2>
            <p className='error-message'>Cannot load input data.</p>
        </section>
    );
}
