from typing import List

from werkzeug.datastructures import FileStorage

PROMPT = "Please sort the images in the order you would like them to appear in the final document. You can sort the images by " \
         "providing the indices of the images in the order you would like them to appear. For example, if you would like " \
         "to sort the images in the order of image 3, image 1, image 2, you would provide the indices as a json as {'ids' = [3, 1, 2]}." \
         "Please provide the indices as a json without additional text or explanation."


class Manager():

    def __init__(self):
        self.model = None

    def sortImages(self, images: List[FileStorage]) -> List[int]:
        raise NotImplementedError
