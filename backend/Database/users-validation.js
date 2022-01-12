db.createCollection('users',{
    validator:{
        $jsonSchema:{
          bsonType:"object",
          required:["email","password","company_id","full_name","role_id"],
          properties:{
            email:{
                bsonType:"string",
                description:"this should be of type string and is required"
            },
            password:{
                bsonType:"string",
                description:"this should be of type string and is required"

            },
            company_id:{
                bsonType:"objectId",
                description:"this should be of type objectid and is required"

            },
            full_name:{
                bsonType:"string",
                description:"this should be of type string and is required"

            },
            role_id:{
                bsonType:"string",
                description:"this should be of type string and is require"
            },
          },
          

        }
    }

})