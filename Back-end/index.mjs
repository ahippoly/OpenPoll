import express from 'express';
import { Web3Storage, File } from 'web3.storage'
import dotvenv from 'dotenv'
import cors from 'cors'
dotvenv.config()

const app = express()
const port = process.env.PORT


function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}

function makeFileObjects (obj, fileName) {
    // You can create File objects from a Buffer of binary data
    // see: https://nodejs.org/api/buffer.html
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const buffer = Buffer.from(JSON.stringify(obj))
  
    const files = [
      new File([buffer], fileName)
    ]
    return files
  }

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

async function storeWithProgress (files) {
    // show the root cid as soon as it's ready
    const onRootCidReady = cid => {
      console.log('uploading files with cid:', cid)
    }
  
    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
    let uploaded = 0
  
    const onStoredChunk = size => {
      uploaded += size
      const pct = 100 * (uploaded / totalSize)
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }
  
    // makeStorageClient returns an authorized web3.storage client instance
    const client = makeStorageClient()
  
    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk })
}

async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
}

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', async (req, res) => {
    try 
    {
      const surveyData = req.body
      console.log("🚀 ~ file: index.mjs:79 ~ app.post ~ surveyData:", surveyData)
      const surveyName = `${surveyData.name}.json` 
      const cid = await storeFiles(makeFileObjects(surveyData, surveyName));
  
      res.json({
          "name": surveyName,
          "cid": cid
      })
    } catch (err)
    {
      console.log(err)

      res.status(500).json({
        "error": "Internal Error"
      })
    }
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})