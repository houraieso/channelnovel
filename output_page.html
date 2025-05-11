// ===== 💾 localStorage ユーティリティ =====

const defaultSettings = {
  defaultName: '名無しの審神者',
  lineSpacing: 2,
  genres: ['刀剣乱舞', 'ツイステ'],
  kotehans: [
    { name: '武蔵国審神者', color: '#FFD700', genre: '刀剣乱舞' },
    { name: '美濃国審神者', color: '#7F9E7F', genre: '刀剣乱舞' },
    { name: '名無しの厳格', color: '#FF0000', genre: 'ツイステ' },
    { name: '名無しの不屈', color: '#f0eb67', genre: 'ツイステ' },
    { name: '名無しの慈悲', color: '#DDA0DD', genre: 'ツイステ' },
    { name: '名無しの熟慮', color: '#852217', genre: 'ツイステ' },
    { name: '名無しの勤勉', color: '#1E90FF', genre: 'ツイステ' }
  ]
};

const defaultInputState = {
  startValue: 1,
  endValue: 100,
  currentGenre: '',
  useButtonMode: true,
  resSelections: []
};

function ensureSettingsInitialized() {
  if (!localStorage.getItem('channeruSettings')) {
    localStorage.setItem('channeruSettings', JSON.stringify(defaultSettings));
  }
  if (!localStorage.getItem('channeruInputState')) {
    localStorage.setItem('channeruInputState', JSON.stringify(defaultInputState));
  }
}

function getSettings() {
  ensureSettingsInitialized();
  return JSON.parse(localStorage.getItem('channeruSettings'));
}

function saveSettings(settings) {
  localStorage.setItem('channeruSettings', JSON.stringify(settings));
}

function getResData() {
  const data = localStorage.getItem('channeruResData');
  return data ? JSON.parse(data) : [];
}

function saveInputState(newStatePartial) {
  const currentState = getInputState();
  const newState = {...currentState, ...newStatePartial};
  localStorage.setItem('channeruInputState', JSON.stringify(newState));
}

function getInputState() {
  ensureSettingsInitialized();
  return JSON.parse(localStorage.getItem('channeruInputState'));
}

// ===== 📥 レス入力ページ用の関数群 =====

function generateResInputs() {
  const startValue = document.getElementById('start-value');
  const endValue = document.getElementById('end-value');
  const resContainer = document.getElementById('res-container');

  if (!startValue || !endValue || !resContainer) {
    console.error("必要な要素が見つかりません");
    return;
  }

  const s = parseInt(startValue.value);
  const e = parseInt(endValue.value);
  const settings = getSettings();
  const defaultName = settings.defaultName || "名無し";
  const allKotehans = settings.kotehans || [];
  const inputState = getInputState();
  const currentGenre = inputState.currentGenre || settings.genres[0];
  const useButtonMode = inputState.useButtonMode !== undefined ? inputState.useButtonMode : true;
  const genreKotehans = allKotehans.filter(k => k.genre === currentGenre);

  const savedData = getResData();
  let resSelections = inputState.resSelections || [];

  // resSelectionsの長さが足りない場合は拡張
  while (resSelections.length < (e - s + 1)) {
    resSelections.push({});
  }

  resContainer.innerHTML = "";

  for (let i = s; i <= e; i++) {
    const itemIndex = i - s;
    const resNumber = i;
    const savedRes = savedData.find(res => res.number === resNumber);
    const savedSelection = resSelections[itemIndex] || {};

    const item = document.createElement("div");
    item.className = "res-item";
    item.dataset.resNumber = resNumber;

    const header = document.createElement("div");
    header.className = "res-header";

    const num = document.createElement("strong");
    num.textContent = `${i}: `;

    const nameSpan = document.createElement("span");
    nameSpan.className = "res-name";

    // 名前表示設定（isDefaultフラグ考慮）
    if (savedRes) {
      nameSpan.textContent = savedRes.isDefault ? defaultName : (savedRes.name || defaultName);
    } else {
      nameSpan.textContent = defaultName;
    }

    header.appendChild(num);
    header.appendChild(nameSpan);
    item.appendChild(header);

    // アバターボタンコンテナ
    const avatarBox = document.createElement("div");
    avatarBox.className = "avatar-container";

    // デフォルトアイコン
    const defaultIcon = document.createElement("div");
    defaultIcon.className = "avatar";
    defaultIcon.style.backgroundColor = "#ccc";
    defaultIcon.title = defaultName;
    defaultIcon.onclick = () => {
      nameSpan.textContent = defaultName;
      avatarBox.querySelectorAll(".avatar").forEach(a => a.classList.remove("active"));
      defaultIcon.classList.add("active");

      if (dropdown) dropdown.value = "";

      // 選択状態更新
      resSelections[itemIndex] = { kotehanName: "" };
      saveInputState({ resSelections });
      updateResData();
    };
    avatarBox.appendChild(defaultIcon);

    // 各コテハンのアバターボタン
    genreKotehans.forEach(k => {
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.style.backgroundColor = k.color;
      avatar.title = k.name;
      avatar.onclick = () => {
        nameSpan.textContent = k.name;
        avatarBox.querySelectorAll(".avatar").forEach(a => a.classList.remove("active"));
        avatar.classList.add("active");

        if (dropdown) dropdown.value = k.name;

        // 選択状態更新
        resSelections[itemIndex] = { kotehanName: k.name };
        saveInputState({ resSelections });
        updateResData();
      };
      avatarBox.appendChild(avatar);
    });

    // コテハン選択ドロップダウン
    const dropdown = document.createElement("select");
    dropdown.className = "kotehan-dropdown";

    // デフォルト選択肢
    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = defaultName;
    dropdown.appendChild(emptyOpt);

    // コテハン選択肢
    genreKotehans.forEach(k => {
      const opt = document.createElement("option");
      opt.value = k.name;
      opt.textContent = k.name;
      dropdown.appendChild(opt);
    });

    dropdown.onchange = () => {
      const selected = dropdown.value;
      nameSpan.textContent = selected || defaultName;

      // アバターボタン選択状態も同期
      avatarBox.querySelectorAll(".avatar").forEach(a => {
        a.classList.toggle("active", a.title === selected || (selected === "" && a.title === defaultName));
      });

      // 選択状態更新
      resSelections[itemIndex] = { kotehanName: selected };
      saveInputState({ resSelections });
      updateResData();
    };

    // 選択モードに応じた表示切替
    if (useButtonMode) {
      dropdown.style.display = "none";
      item.appendChild(avatarBox);
    } else {
      avatarBox.style.display = "none";
      item.appendChild(dropdown);
    }

    // テキスト入力欄
    const textarea = document.createElement("textarea");
    textarea.className = "res-content";
    textarea.placeholder = "レス内容を入力...";

    if (savedRes) {
      textarea.value = savedRes.content || "";
    }

    textarea.oninput = () => {
      updateResData();
    };

    item.appendChild(textarea);
    resContainer.appendChild(item);

    // コテハン選択状態の復元
    let kotehanToSelect = "";

    // まずレス保存データを参照：デフォルト名ではない場合のみ考慮
    if (savedRes && !savedRes.isDefault && savedRes.name) {
      kotehanToSelect = savedRes.name;
    }
    // 次に選択状態を参照
    else if (savedSelection.kotehanName) {
      kotehanToSelect = savedSelection.kotehanName;
    }

    if (kotehanToSelect) {
      dropdown.value = kotehanToSelect;

      // ボタンモードの場合、対応するアバターもアクティブに
      if (useButtonMode) {
        avatarBox.querySelectorAll(".avatar").forEach(a => {
          if (a.title === kotehanToSelect) a.classList.add("active");
        });
      }

      nameSpan.textContent = kotehanToSelect;
    } else {
      // デフォルトアイコンをアクティブに
      if (useButtonMode) {
        defaultIcon.classList.add("active");
      }
    }
  }

  // 初期データ保存
  updateResData();

  // カスタムドロップダウン適用
  if (!useButtonMode) {
    setTimeout(replaceKotehanDropdowns, 100);
  }
}

// レスデータ更新関数
function updateResData() {
  const settings = getSettings();
  const defaultName = settings.defaultName;
  const data = [];

  document.querySelectorAll(".res-item").forEach(item => {
    const number = parseInt(item.dataset.resNumber);
    const nameElement = item.querySelector(".res-name");
    const name = nameElement ? nameElement.textContent : "";
    const content = item.querySelector("textarea").value || "";
    const avatar = item.querySelector(".avatar.active");
    const colorCode = avatar ? avatar.style.backgroundColor : "#000";
    // デフォルト名かどうかをフラグで判断
    const isDefault = name === defaultName || !name;

    data.push({ number, name, content, colorCode, isDefault });
  });

  localStorage.setItem("channeruResData", JSON.stringify(data));
}

// ===== 🌐 タブ切り替え（ナビゲーション） =====
document.addEventListener('DOMContentLoaded', () => {
  const tabs = {
    'input-tab': 'index.html',
    'output-tab': 'output_page.html',
    'settings-tab': 'kotehane_management.html'
  };

  Object.entries(tabs).forEach(([id, url]) => {
    const tab = document.getElementById(id);
    if (tab) {
      tab.addEventListener('click', () => window.location.href = url);
    }
  });
});

// ===== 🔄 カスタムドロップダウン関連の機能 =====

// カスタムドロップダウンを作成する関数
function createCustomDropdown(selectElement) {
  if (!selectElement) return;

  // 元のセレクト要素の情報を取得
  const options = Array.from(selectElement.options || []);
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const id = selectElement.id || selectElement.name || 'dropdown-' + Math.random().toString(36).substr(2, 9);
  const isKotehan = selectElement.className.includes('kotehan-dropdown');

  // 既にカスタムドロップダウンが存在する場合は作成しない
  const parent = selectElement.parentElement;
  if (parent && parent.querySelector('.custom-dropdown')) {
    return;
  }

  // カスタムドロップダウンのコンテナを作成
  const customDropdown = document.createElement('div');
  customDropdown.className = 'custom-dropdown';
  customDropdown.dataset.for = id;

  // レス項目内かを判定
  if (selectElement.closest('.res-item')) {
    customDropdown.classList.add('res-dropdown');
  }

  // 選択表示部分を作成
  const dropdownSelect = document.createElement('div');
  dropdownSelect.className = 'custom-dropdown-select';

  // 選択された値を表示（コテハンの場合は色付きで）
  if (isKotehan && selectedOption) {
    const settings = getSettings();
    const defaultName = settings.defaultName || '名無しの審神者';

    if (selectedOption.value) {
      // コテハンの色を取得
      const allKotehans = settings.kotehans || [];
      const matchingKotehan = allKotehans.find(k => k.name === selectedOption.value);

      const colorSpan = document.createElement('span');
      colorSpan.className = 'kotehan-option-color';
      colorSpan.style.backgroundColor = matchingKotehan ? matchingKotehan.color : '#ccc';

      const textSpan = document.createElement('span');
      textSpan.textContent = selectedOption.textContent;

      dropdownSelect.appendChild(colorSpan);
      dropdownSelect.appendChild(textSpan);
    } else {
      // デフォルト名の場合
      const colorSpan = document.createElement('span');
      colorSpan.className = 'kotehan-option-color';
      colorSpan.style.backgroundColor = '#ccc';

      const textSpan = document.createElement('span');
      textSpan.textContent = defaultName;

      dropdownSelect.appendChild(colorSpan);
      dropdownSelect.appendChild(textSpan);
    }
  } else {
    dropdownSelect.textContent = selectedOption ? selectedOption.textContent : '選択してください';
  }

  // オプション一覧を格納する部分を作成
  const dropdownOptions = document.createElement('div');
  dropdownOptions.className = 'custom-dropdown-options';

  // 各オプションを作成
  options.forEach(option => {
    const dropdownOption = document.createElement('div');
    dropdownOption.className = 'custom-dropdown-option';
    dropdownOption.dataset.value = option.value;

    if (isKotehan) {
      // コテハンドロップダウンの場合
      dropdownOption.className += ' kotehan-custom-dropdown-option';

      // コテハンの色を表示する要素
      const colorSpan = document.createElement('span');
      colorSpan.className = 'kotehan-option-color';

      // コテハンの名前と一致する色を探す
      if (option.value) {
        const settings = getSettings();
        const allKotehans = settings.kotehans || [];
        const matchingKotehan = allKotehans.find(k => k.name === option.value);
        colorSpan.style.backgroundColor = matchingKotehan ? matchingKotehan.color : '#ccc';
      } else {
        // 空のオプションはデフォルト用
        colorSpan.style.backgroundColor = '#ccc';
      }

      dropdownOption.appendChild(colorSpan);
    }

    // テキスト部分
    const textSpan = document.createElement('span');
    // 空のオプション（デフォルト名）の場合は設定から取得
    if (isKotehan && option.value === '') {
      const settings = getSettings();
      textSpan.textContent = settings.defaultName || '名無しの審神者';
    } else {
      textSpan.textContent = option.textContent;
    }
    dropdownOption.appendChild(textSpan);

    // オプションクリック時の処理
    dropdownOption.addEventListener('click', function(e) {
      // イベントの伝播を停止
      e.stopPropagation();

      // 選択表示部分を更新
      if (isKotehan) {
        // コテハンの場合は色付きで表示
        dropdownSelect.innerHTML = '';

        const colorSpan = document.createElement('span');
        colorSpan.className = 'kotehan-option-color';

        if (this.dataset.value) {
          // getSettings関数で設定を取得
          const settings = getSettings();
          const allKotehans = settings.kotehans || [];
          const matchingKotehan = allKotehans.find(k => k.name === this.dataset.value);
          colorSpan.style.backgroundColor = matchingKotehan ? matchingKotehan.color : '#ccc';
        } else {
          colorSpan.style.backgroundColor = '#ccc';
        }

        dropdownSelect.appendChild(colorSpan);

        const textSpan = document.createElement('span');
        textSpan.textContent = this.querySelector('span:last-child').textContent;
        dropdownSelect.appendChild(textSpan);
      } else {
        // 通常のドロップダウンの場合はテキストのみ
        dropdownSelect.textContent = this.textContent;
      }

      // 元のセレクト要素の値を更新
      selectElement.value = this.dataset.value;

      // カスタムイベントをディスパッチして元のchange処理を発火
      const event = new Event('change');
      selectElement.dispatchEvent(event);

      // ドロップダウンを閉じる
      dropdownOptions.classList.remove('show');
    });

    dropdownOptions.appendChild(dropdownOption);
  });

  // 選択表示部分クリック時のドロップダウン表示/非表示切り替え
  dropdownSelect.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = dropdownOptions.classList.contains('show');

    // 他の開いているドロップダウンをすべて閉じる
    document.querySelectorAll('.custom-dropdown-options.show').forEach(el => {
      el.classList.remove('show');
    });

    // クリックされたドロップダウンの表示状態を切り替え
    if (!isOpen) {
      dropdownOptions.classList.add('show');
    }
  });

  // クリックイベントでドロップダウンを閉じる（ドキュメント全体）
  document.addEventListener('click', function() {
    dropdownOptions.classList.remove('show');
  });

  // セレクト要素を非表示にする
  selectElement.style.display = 'none';

  // カスタムドロップダウンを組み立てる
  customDropdown.appendChild(dropdownSelect);
  customDropdown.appendChild(dropdownOptions);

  // 元のセレクト要素の後ろにカスタムドロップダウンを挿入
  selectElement.after(customDropdown);
}

// すべてのセレクト要素をカスタムドロップダウンに置き換える関数
function replaceSelectsWithCustomDropdowns() {
  document.querySelectorAll('select').forEach(select => {
    // 既にカスタム化されていない場合のみ処理
    if (!select.style.display || select.style.display !== 'none') {
      createCustomDropdown(select);
    }
  });
}

// コテハンドロップダウンの置き換え関数
function replaceKotehanDropdowns() {
  document.querySelectorAll('select.kotehan-dropdown').forEach(select => {
    // 既にカスタム化されていない場合のみ処理
    if (!select.style.display || select.style.display !== 'none') {
      createCustomDropdown(select);
    }
  });
}

// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
  // ドロップダウンボタン検出とイベント設定
  const dropdownToggle = document.getElementById('dropdown-toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function() {
      // 少し遅延させてDOM要素が確実に存在するようにする
      setTimeout(replaceKotehanDropdowns, 100);
    });
  }

  // 既存の生成関数を拡張
  if (window.generateResInputs) {
    const originalGenerateResInputs = window.generateResInputs;
    window.generateResInputs = function() {
      originalGenerateResInputs.apply(this, arguments);
      // 少し遅延させてDOM要素が確実に存在するようにする
      setTimeout(replaceKotehanDropdowns, 100);
    };
  }

  // 遅延を入れて初期化
  setTimeout(replaceSelectsWithCustomDropdowns, 300);
});

// ===== ✅ コピー通知表示 =====
function showNotification(message = 'コピーしました') {
  const notification = document.getElementById('copy-notification');
  if (notification) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 2000);
  }
}
