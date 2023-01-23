import FetchedDescription from './fetch_description_list';

function About() {
    return (
        <section className="about-page">
            <div className="about-page__what-is-vin">
                <h2>What is a VIN Number (Vehicle Identification Number)?</h2>
                <p>A vehicle identification number (VIN) is a unique code assigned to every motor vehicle when it's manufactured. The VIN is a 17-character string of letters and numbers without intervening spaces or the letters Q (q), I (i), and O (o); these are omitted to avoid confusion with the numerals 0 and 1. Each section of the VIN provides a specific piece of information about the vehicle, including the year, country, and factory of manufacture; the make and model; and the serial number. VINs are usually printed in a single line.</p>
            </div>
            <div className="about-page__how-to-find-vin">
                <h2>How to Find the Vehicle's VIN Number</h2>
                <p>On most passenger cars, you may find the VIN number on the front of the dashboard on the driver's side. The best way to see it is to look through the windshield from outside the car. You may also find the VIN number on the driver's side door pillar. Open the door and look around the area where the door latches to the car. A motorcycle's VIN is usually on the steering neck below the handlebars, although sometimes it's on the motor or on the frame near the motor. A semitrailer's VIN is located on the front part of the semitrailer on the left side. 
                If you can't find the VIN number on the vehicle, you should also be able to locate it on your vehicle's title or liability insurance documents.</p>
            </div>
            <div className="about-page__why-vin-important">
                <h2>Why the VIN Is Important</h2>
                <p>There are situations in which you will want to check a vehicle's VIN, since many data registries use it to record details of the vehicle's history. If you're interested in buying a used car, you can do a VIN lookup to get the vehicle history report and find records of its previous owners, accidents, and repairs. You can also find out if the manufacturer had ever issued a recall of the vehicle and whether those repairs were made. Finally, law enforcement agencies do a VIN check to identify vehicles that have been stolen.</p>
            </div>
            <FetchedDescription />
        </section>
    );
}

export default About;