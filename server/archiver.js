const fs = require('fs')

class Archiver {
    #maximumNumberOfMessages = 10
    #archivePath = './archivePath.json'
    #archiveContent = {}

    start() {
        if (!fs.existsSync(this.#archivePath)) {
            return this.#archiveContent
        }

        const archive = fs.readFileSync(this.#archivePath, 'utf8')
        this.#archiveContent = JSON.parse(archive)
    }

    fetch(room) {
        return this.#archiveContent[room] ? this.#archiveContent[room] : []
    }

    async archive(text, user, createdTime, room) {
        if (!this.#archiveContent[room]) {
            this.#archiveContent[room] = []
        } else if (
            this.#archiveContent[room].lenght + 1 >
            this.#maximumNumberOfMessages
        ) {
            this.#archiveContent[room].shift()
        }
        this.#archiveContent[room].push({ text, user, createdTime })
        await fs.promises.writeFile(
            this.#archivePath,
            JSON.stringify(this.#archiveContent)
        )
    }
}

module.exports = { Archiver }
