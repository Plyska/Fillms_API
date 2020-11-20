const MongoClient = require('mongodb').MongoClient;


const films = [
    {
    Title: "Blazing Saddles",
    ReleaseYear: 1974,
    Format: "VHS",
    Stars: ['Mel Brooks', 'Clevon Little', 'Harvey Korman', 'Gene Wilder', 'Slim Pickens', 'Madeline Kahn']
    },
    {
    Title: "Casablanca",
    ReleaseYear: 1942,
    Format: "DVD",
    Stars: ['Humphrey Bogart', 'Ingrid Bergman', 'Claude Rains', 'Peter Lorre']
    },
    {
    Title: "Charade",
    ReleaseYear: 1953,
    Format: "DVD",
    Stars: ['Audrey Hepburn', 'Cary Grant', 'Walter Matthau', 'James Coburn', 'George Kennedy']
    },
    {
    Title: "Cool Hand Luke",
    ReleaseYear: 1967,
    Format: "VHS",
    Stars: ['Paul Newman', 'George Kennedy', 'Strother Martin']
    },
    {
    Title: "Butch Cassidy and the Sundance Kid",
    ReleaseYear: 1969,
    Format: "VHS",
    Stars: ['Paul Newman', 'Robert Redford', 'Katherine Ross']
    },
    {
    Title: "The Sting",
    ReleaseYear: 1973,
    Format: "DVD",
    Stars: ['Robert Redford', 'Paul Newman', 'Robert Shaw', 'Charles Durning']
    },
    {
    Title: "The Muppet Movie",
    ReleaseYear: 1979,
    Format: "DVD",
    Stars: ['Jim Henson', 'Frank Oz', 'Dave Geolz', 'Mel Brooks', 'James Coburn', 'Charles Durning', 'Austin Pendleton']
    },
    {
    Title: "Get Shorty ",
    ReleaseYear: 1995,
    Format: "DVD",
    Stars: ['John Travolta', 'Danny DeVito', 'Renne Russo', 'Gene Hackman', 'Dennis Farina']
    },
    {
    Title: "My Cousin Vinny",
    ReleaseYear: 1992,
    Format: "DVD",
    Stars: ['Joe Pesci', 'Marrisa Tomei', 'Fred Gwynne', 'Austin Pendleton', 'Lane Smith', 'Ralph Macchio']
    },
    {
    Title: "Gladiator",
    ReleaseYear: 2000,
    Format: "Blu-Ray",
    Stars: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielson']
    },
    {
    Title: "Star Wars",
    ReleaseYear: 1977,
    Format: "Blu-Ray",
    Stars: ['Harrison Ford', 'Mark Hamill', 'Carrie Fisher', 'Alec Guinness', 'James Earl Jones']
    },
    {
    Title: "Raiders of the Lost Ark",
    ReleaseYear: 1981,
    Format: "DVD",
    Stars: ['Harrison Ford', 'Karen Allen']
    },
    {
    Title: "Serenity",
    ReleaseYear: 2005,
    Format: "Blu-Ray",
    Stars: ['Nathan Fillion', 'Alan Tudyk', 'Adam Baldwin', 'Ron Glass', 'Jewel Staite', 'Gina Torres', 'Morena Baccarin', 'Sean Maher', 'Summer Glau', 'Chiwetel Ejiofor']
    },
    {
    Title: "Hooisers",
    ReleaseYear: 1986,
    Format: "VHS",
    Stars: ['Gene Hackman', 'Barbara Hershey', 'Dennis Hopper']
    },
    {
    Title: "WarGames",
    ReleaseYear: 1983,
    Format: "VHS",
    Stars: ['Matthew Broderick', 'Ally Sheedy', 'Dabney Coleman', 'John Wood', 'Barry Corbin']
    },
    {
    Title: "Spaceballs",
    ReleaseYear: 1987,
    Format: "DVD",
    Stars: ['Bill Pullman', 'John Candy', 'Mel Brooks', 'Rick Moranis', 'Daphne Zuniga', 'Joan Rivers']
    },
    {
    Title: "Young Frankenstein",
    ReleaseYear: 1974,
    Format: "VHS",
    Stars: ['Gene Wilder', 'Kenneth Mars', 'Terri Garr', 'Gene Hackman', 'Peter Boyle']
    },
    {
    Title: "Real Genius",
    ReleaseYear: 1985,
    Format: "VHS",
    Stars: ['Val Kilmer', 'Gabe Jarret', 'Michelle Meyrink', 'William Atherton']
    },
    {
    Title: "Top Gun",
    ReleaseYear: 1986,
    Format: "DVD",
    Stars: ['Tom Cruise', 'Kelly McGillis', 'Val Kilmer', 'Anthony Edwards', 'Tom Skerritt']
    },
    {
    Title: "MASH",
    ReleaseYear: 1970, 
    Format: "DVD",
    Stars: ['Donald Sutherland', 'Elliot Gould', 'Tom Skerritt', 'Sally Kellerman', 'Robert Duvall']
    },
    {
    Title: "The Russians Are Coming",
    ReleaseYear: 1966,
    Format: "VHS",
    Stars: ['Carl Reiner', 'Eva Marie Saint', 'Alan Arkin', 'Brian Keith']
    },
    {
    Title: "Jaws",
    ReleaseYear: 1975, 
    Format: "DVD",
    Stars: ['Roy Scheider', 'Robert Shaw', 'Richard Dreyfuss', 'Lorraine Gary'] 
    },
    {
    Title: "2001: A Space Odyssey",
    ReleaseYear: 1968,
    Format: "DVD",
    Stars: ['Keir Dullea', 'Gary Lockwood', 'William Sylvester', 'Douglas Rain']
    },
    {
    Title: "Harvey",
    ReleaseYear: 1950, 
    Format: "DVD",
    Stars: ['James Stewart', 'Josephine Hull', 'Peggy Dow', 'Charles Drake']
    },
    {
    Title: "Knocked Up",
    ReleaseYear: 2007,
    Format: "Blu-Ray",
    Stars: ['Seth Rogen', 'Katherine Heigl', 'Paul Rudd', 'Leslie Mann'] 
}];

const url = 'mongodb://localhost:27017';
const dbName = 'apiFilms';

MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);
    db.collection('films').insertMany(films);
});