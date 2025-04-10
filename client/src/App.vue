<template>
  <div class="container">
    <header>
      <h1>Gun.js Playground</h1>
    </header>

    <main>
      <div class="gun-demo">
        <h2>Gun.js Demo</h2>
        <div class="form-group">
          <label for="key">Key:</label>
          <input type="text" id="key" v-model="dataKey" placeholder="Enter a key" />
        </div>
        <div class="form-group">
          <label for="value">Value:</label>
          <input type="text" id="value" v-model="dataValue" placeholder="Enter a value" />
        </div>
        <div class="buttons">
          <button @click="saveData">Save Data</button>
          <button @click="loadData">Load Data</button>
        </div>
        
        <div v-if="result" class="result">
          <h3>Result:</h3>
          <pre>{{ result }}</pre>
        </div>
      </div>
    </main>

    <footer>
      <p>Built with Vue 3, Express, and Gun.js</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Gun from 'gun';

export default defineComponent({
  name: 'App',
  setup() {
    const dataKey = ref('');
    const dataValue = ref('');
    const result = ref('');

    // Initialize Gun
    const gun = Gun('http://localhost:3000/gun');

    const saveData = () => {
      if (!dataKey.value) {
        result.value = 'Error: Please provide a key';
        return;
      }

      gun.get(dataKey.value).put({ value: dataValue.value }, (ack) => {
        if (ack.err) {
          result.value = `Error: ${ack.err}`;
        } else {
          result.value = `Saved: ${dataKey.value} = ${dataValue.value}`;
        }
      });
    };

    const loadData = () => {
      if (!dataKey.value) {
        result.value = 'Error: Please provide a key';
        return;
      }

      gun.get(dataKey.value).on((data) => {
        if (data && data.value !== undefined) {
          result.value = `Loaded: ${dataKey.value} = ${data.value}`;
          dataValue.value = data.value;
        } else {
          result.value = `No data found for key: ${dataKey.value}`;
        }
      });
    };

    return {
      dataKey,
      dataValue,
      result,
      saveData,
      loadData
    };
  }
});
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  margin-bottom: 30px;
  text-align: center;
}

.gun-demo {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.result {
  background-color: #e8e8e8;
  padding: 10px;
  border-radius: 4px;
}

pre {
  white-space: pre-wrap;
}

footer {
  text-align: center;
  color: #666;
  padding-top: 20px;
}
</style>
