from pydantic import BaseModel
from typing import Optional #added model optional to models.py

class Item(BaseModel):
    name: str
    description: str

class User(BaseModel):
    username: str
    bio: str
    
    # You can raise your hands and give the answer to the chocolate question