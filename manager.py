import json
from typing import List
from langchain_openai import ChatOpenAI
from langchain_core.pydantic_v1 import BaseModel, Field
from werkzeug.datastructures import FileStorage
from langchain_core.pydantic_v1 import BaseModel, Field
import 


class ImageInformation(BaseModel):
 """Information about an image."""
 image_description: str = Field(description="a short description of the image")
 people_count: int = Field(description="number of humans on the picture")
 main_objects: list[str] = Field(description="list of the main objects on the picture")

PROMPT = "Please sort the images in the order you would like them to appear in the final document. You can sort the images by " \
         "providing the indices of the images in the order you would like them to appear. For example, if you would like " \
         "to sort the images in the order of image 3, image 1, image 2, you would provide the indices as a json as {'ids' = [3, 1, 2]}." \
         "Please provide the indices as a json without additional text or explanation."

def load_image(inputs: dict) -> dict:
    """Load image from file and encode it as base64."""
    image_path = inputs["image_path"]
  
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    image_base64 = encode_image(image_path)
    return {"image": image_base64}

load_image_chain = TransformChain(
    input_variables=["image_path"],
    output_variables=["image"],
    transform=load_image
)

@chain
def image_model(inputs: dict) -> str | list[str] | dict:
 """Invoke model with image and prompt."""
 model = ChatOpenAI(temperature=0.5, model="gpt-4-vision-preview", max_tokens=1024)
 msg = model.invoke(
             [HumanMessage(
             content=[
             {"type": "text", "text": inputs["prompt"]},
             {"type": "text", "text": parser.get_format_instructions()},
             {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{inputs['image']}"}},
             ])]
             )
 return msg.content

def convertToListInt(json_str: str) -> List[int]:
    try:
        json_dict = json.loads(json_str)
        return json_dict.get('ids')
    except json.JSONDecodeError:
        return []


class Manager():

    def __init__(self):
        self.model = None

    def sortImages(self, images: List[FileStorage]) -> List[int]:
        raise NotImplementedError
