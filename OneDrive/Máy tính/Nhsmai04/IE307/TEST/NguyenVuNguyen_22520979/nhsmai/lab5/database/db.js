import * as Sqlite from 'expo-sqlite';

const db = Sqlite.openDatabaseSync('places.db');

export const createTable = async () => {
    try {
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            image TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            location TEXT NOT NULL
        );`
      );
      console.log("Table created successfully");
    } catch (error) {
      console.log("Error when creating table: ", error);
    }
  };

  export const insertPlace = async (title, image, latitude, longitude, location, callback) => {
    try {
      //console.log('Inserting place with title:', title, 'image:', image, 'latitude:', latitude, 'longitude:', longitude, 'location:', location);
      
      await db.runAsync(
        `INSERT INTO places (title, image, latitude, longitude, location) VALUES (?, ?, ?, ?, ?)`,
        [title, image, latitude, longitude, location]
      );
  
      callback(); // Chạy callback khi đã lưu xong
    } catch (error) {
      console.log("Error when inserting place: ", error);
      alert("Error when saving place");
    }
  };
  


export const fetchPlaces = async (callback) => {
   try {
    const places = await db.getAllAsync(`SELECT * FROM places`);
    //console.log("Danh sach dia diem",places);
    callback(places);
   } catch (error) {
    console.log("Loi khi lay du lieu dia diem",error);
   }
    
}

export const fetchPlaceById = async (id, callback) => {
  try {
    const place = await db.getAsync(`SELECT * FROM places WHERE id = ?`, [id]);
    console.log("Dia diem theo id",place);
    callback(place);
  } catch (error) {
    console.log("Loi khi lay du lieu dia diem",error);
  }
}
export const updateTable = async () => {
    try {
      // Thêm cột 'location' vào bảng 'places'
      await db.execAsync(
        `ALTER TABLE places ADD COLUMN location TEXT NOT NULL;`
      );
      console.log("Column 'location' added successfully!");
    } catch (error) {
      console.log("Error when adding column:", error);
    }
  };

  export const dropTable = async () => {
    try {
      await db.execAsync('DROP TABLE IF EXISTS places');
      console.log("Table 'places' has been dropped successfully!");
    } catch (error) {
      console.log("Error when dropping the table:", error);
    }
  };

  

  