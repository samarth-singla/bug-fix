from fastapi import APIRouter, HTTPException
from models import User
from bson import ObjectId

router = APIRouter()

async def get_users_collection():
    from db import init_db
    return init_db()["users_collection"]

@router.get("/") #changed post to get request
async def get_users():
    collection = await get_users_collection()
    users = []
    async for user in collection.find():
        user["_id"] = str(user["_id"])
        users.append(user)
    return users

@router.post("/")
async def create_user(user: User):
    collection = await get_users_collection()
    result = await collection.insert_one(user.dict())
    if result.inserted_id:
        return {"id": str(result.inserted_id)}
    raise HTTPException(status_code=500, detail="Failed to create user")

@router.delete("/{user_id}")
async def delete_user(user_id: str):
    collection = await get_users_collection()
<<<<<<< HEAD
    try:
        # Convert string ID to ObjectId for MongoDB query
        object_id = ObjectId(user_id)
        result = await collection.delete_one({"_id": object_id})
        
        if result.deleted_count:
            return {"status": "deleted"}
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid ID format or other error: {str(e)}")
=======
    result = await collection.delete_one({"_id": ObjectId(user_id)})    # changed delete_all to delete_one
    if result.deleted_count:
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="User not found")
>>>>>>> b4abc77ae77098b9920850736324ec66f9c999a5
