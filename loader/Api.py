import os.path as path


class API:
    def writeToFile(self, filename: str, data: str):
        with open(getFilePath(filename), "w+") as fs:
            fs.write(data)

    def readfromFile(self, filename: str) -> str:
        with open(getFilePath(filename), "r") as fs:
            return fs.read()


def getFilePath(filename: str) -> str:
    return path.join(path.dirname(__file__), "../", filename)
