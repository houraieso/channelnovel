// ===== 💾 localStorage ユーティリティ =====

// デフォルト初期設定（ジャンル・コテハン）
const defaultSettings = {
  defaultName: '名無しの審神者',
  lineSpacing: 2,
  genres: ['刀剣乱舞', 'ツイステ'],
  kotehans: [
    { name: '武蔵国審神者', color: '#FFD700', genre: '刀剣乱舞' },
    { name: '美濃国審神者', color: '#7F9E7F', genre: '刀剣乱舞' },
    { name: '名無しの厳格', color: '#FF0000', genre: 'ツイステ' },
    { name: '名無しの慈悲', color: '#DDA0DD', genre: 'ツイステ' },
    { name: '名無しの勤勉', color: '#1E90FF', genre: 'ツイステ' }
  ]
};

// 入力ページの状態保存用
const defaultInputState = {
  startValue: 1,
  endValue: 100,
  currentGenre: '',
  useButtonMode: true,
  resSelections: [] // レスごとの選択状態
};

function ensureSettingsInitialized() {
  if (!localStorage.getItem('channeruSettings')) {
    localStorage.setItem('channeruSettings', JSON.stringify(defaultSettings));
  }

  // 入力ページの状態も初期化
  if (!localStorage.getItem('channeruInputState')) {
    localStorage.setItem('channeruInputState', JSON.stringify(defaultInputState));
  }
}

// 設定を取得
function getSettings() {
  ensureSettingsInitialized();
  return JSON.parse(localStorage.getItem('channeruSettings'));
}

// 設定を保存
function saveSettings(settings) {
  localStorage.setItem('channeruSettings', JSON.stringify(settings));
}

// レスデータを保存
function saveResData(resArray) {
  localStorage.setItem('channeruResData', JSON.stringify(resArray));
}

// レスデータを取得
function getResData() {
  const data = localStorage.getItem('channeruResData');
  return data ? JSON.parse(data) : [];
}

// 入力ページの状態を保存
function saveInputState(state) {
  const currentState = getInputState();
  const newState = {...currentState, ...state};
  localStorage.setItem('channeruInputState', JSON.stringify(newState));
}

// 入力ページの状態を取得
function getInputState() {
  ensureSettingsInitialized();
  return JSON.parse(localStorage.getItem('channeruInputState'));
}

// ===== 🌐 タブ切り替え（ナビゲーション） =====
document.addEventListener('DOMContentLoaded', () => {
  const tabs = {
    'input-tab': '/channelnovel/',
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

// より高度な機能を追加する場合のJavaScript
// 選択的な連続増減機能を実装するJavaScript
document.addEventListener('DOMContentLoaded', function() {
  // 開始と終了の入力欄（連続増減あり）
  setupContinuousIncrement('start-value');
  setupContinuousIncrement('end-value');

  // 行間設定（連続増減なし - シンプルなクリックのみ）
  setupSimpleIncrement('line-spacing');

  // 値の変更をコンソールに表示する簡単なデモ（必要に応じて）
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.addEventListener('change', function() {
      console.log(`${this.id} の値が ${this.value} に変更されました`);
    });
  });
});

// 連続増減機能をセットアップする関数
function setupContinuousIncrement(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return; // 要素が存在しない場合は処理をスキップ

  const container = input.closest('.custom-number-input');
  if (!container) return;

  const upArrow = container.querySelector('.arrow-up');
  const downArrow = container.querySelector('.arrow-down');

  let intervalId = null;
  let mouseDownTime = 0;
  let isLongPress = false;

  // 上矢印の処理
  upArrow.addEventListener('mousedown', function(e) {
    // マウスが押された時間を記録
    mouseDownTime = Date.now();
    isLongPress = false;

    // 長押し検出のタイマーを設定
    const longPressTimer = setTimeout(function() {
      // 長押しと判定（300ms以上押し続けている）
      if (e.buttons === 1) { // まだマウスボタンが押されている場合
        isLongPress = true;
        intervalId = setInterval(function() {
          input.stepUp();
          // 値変更イベントを発火
          const event = new Event('change');
          input.dispatchEvent(event);
        }, 150); // 増加の間隔（ミリ秒）
      }
    }, 300); // 長押し判定の遅延（ミリ秒）

    // マウスアップやマウスリーブ時にタイマーをクリア
    const clearTimers = function() {
      clearTimeout(longPressTimer);
      clearInterval(intervalId);

      // クリックのみの場合（長押しでない場合）は一度だけ増加
      if (!isLongPress && (Date.now() - mouseDownTime) < 300) {
        input.stepUp();
        // 値変更イベントを発火
        const event = new Event('change');
        input.dispatchEvent(event);
      }

      // イベントリスナーを削除
      document.removeEventListener('mouseup', clearTimers);
      document.removeEventListener('mouseleave', clearTimers);
    };

    // mouseupとmouseleaveイベントにリスナーを追加
    document.addEventListener('mouseup', clearTimers);
    document.addEventListener('mouseleave', clearTimers);
  });

  // 下矢印の処理
  downArrow.addEventListener('mousedown', function(e) {
    // マウスが押された時間を記録
    mouseDownTime = Date.now();
    isLongPress = false;

    // 長押し検出のタイマーを設定
    const longPressTimer = setTimeout(function() {
      // 長押しと判定（300ms以上押し続けている）
      if (e.buttons === 1) { // まだマウスボタンが押されている場合
        isLongPress = true;
        intervalId = setInterval(function() {
          input.stepDown();
          // 値変更イベントを発火
          const event = new Event('change');
          input.dispatchEvent(event);
        }, 150); // 減少の間隔（ミリ秒）
      }
    }, 300); // 長押し判定の遅延（ミリ秒）

    // マウスアップやマウスリーブ時にタイマーをクリア
    const clearTimers = function() {
      clearTimeout(longPressTimer);
      clearInterval(intervalId);

      // クリックのみの場合（長押しでない場合）は一度だけ減少
      if (!isLongPress && (Date.now() - mouseDownTime) < 300) {
        input.stepDown();
        // 値変更イベントを発火
        const event = new Event('change');
        input.dispatchEvent(event);
      }

      // イベントリスナーを削除
      document.removeEventListener('mouseup', clearTimers);
      document.removeEventListener('mouseleave', clearTimers);
    };

    // mouseupとmouseleaveイベントにリスナーを追加
    document.addEventListener('mouseup', clearTimers);
    document.addEventListener('mouseleave', clearTimers);
  });

  // onclick属性を無効化（JavaScriptのイベントリスナーで処理するため）
  upArrow.removeAttribute('onclick');
  downArrow.removeAttribute('onclick');
}

// シンプルな1回のみの増減機能をセットアップする関数（行間設定用）
function setupSimpleIncrement(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return; // 要素が存在しない場合は処理をスキップ

  const container = input.closest('.custom-number-input');
  if (!container) return;

  const upArrow = container.querySelector('.arrow-up');
  const downArrow = container.querySelector('.arrow-down');

  // 上矢印の処理 - クリックごとに1回だけ増加
  upArrow.addEventListener('click', function() {
    input.stepUp();
    // 値変更イベントを発火
    const event = new Event('change');
    input.dispatchEvent(event);
  });

  // 下矢印の処理 - クリックごとに1回だけ減少
  downArrow.addEventListener('click', function() {
    input.stepDown();
    // 値変更イベントを発火
    const event = new Event('change');
    input.dispatchEvent(event);
  });

  // mousedownイベントの伝播を停止して、onclick属性のハンドラを優先
  upArrow.addEventListener('mousedown', function(e) {
    e.stopPropagation();
  });

  downArrow.addEventListener('mousedown', function(e) {
    e.stopPropagation();
  });

  // onclick属性を無効化（JavaScriptのイベントリスナーで処理するため）
  upArrow.removeAttribute('onclick');
  downArrow.removeAttribute('onclick');
}

// カスタムドロップダウンを作成する関数の修正版
function createCustomDropdown(selectElement) {
  // 元のセレクト要素の情報を取得
  const options = Array.from(selectElement.options);
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const id = selectElement.id || selectElement.name || 'dropdown-' + Math.random().toString(36).substr(2, 9);
  const isKotehan = selectElement.className.includes('kotehan-dropdown');

  // 既にカスタムドロップダウンが存在する場合は作成しない
  // ID属性がない場合に対応するため、親要素内で探す方法に変更
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
    if (selectedOption.value) {
      // コテハンの色を取得
      const settings = getSettings();
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
      // 名無しの場合
      const colorSpan = document.createElement('span');
      colorSpan.className = 'kotehan-option-color';
      colorSpan.style.backgroundColor = '#ccc';

      const textSpan = document.createElement('span');
      textSpan.textContent = selectedOption.textContent;

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
        // 空のオプションは名無し用
        colorSpan.style.backgroundColor = '#ccc';
      }

      dropdownOption.appendChild(colorSpan);
    }

    // テキスト部分
    const textSpan = document.createElement('span');
    textSpan.textContent = option.textContent;
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

// セレクト要素をカスタムドロップダウンに置き換える
function replaceSelectsWithCustomDropdowns() {
  // ジャンル選択ドロップダウン
  const genreSelect = document.getElementById('genre-select');
  if (genreSelect) {
    createCustomDropdown(genreSelect);
  }

  // 設定ページのジャンル選択ドロップダウン
  const kotehanGenreSelect = document.getElementById('kotehan-genre');
  if (kotehanGenreSelect) {
    createCustomDropdown(kotehanGenreSelect);
  }

  // コテハン選択ドロップダウン（動的に生成されたもの）
  function replaceKotehanDropdowns() {
    document.querySelectorAll('select.kotehan-dropdown').forEach(select => {
      // 既にカスタム化されていない場合のみ処理
      if (!select.style.display || select.style.display !== 'none') {
        createCustomDropdown(select);
      }
    });
  }

  // レス生成後にコテハンドロップダウンを置き換える
  if (typeof window.generateResInputs === 'function') {
    const originalGenerateResInputs = window.generateResInputs;
    window.generateResInputs = function() {
      originalGenerateResInputs.apply(this, arguments);

      // 少し遅延させてDOM要素が確実に存在するようにする
      setTimeout(replaceKotehanDropdowns, 100);
    };
  }

  // ドロップダウンモードが選択された時の処理をオーバーライド
  const dropdownToggle = document.getElementById('dropdown-toggle');
  if (dropdownToggle) {
    const originalClick = dropdownToggle.onclick;
    dropdownToggle.onclick = function() {
      originalClick.apply(this, arguments);

      // 少し遅延させてDOM要素が確実に存在するようにする
      setTimeout(replaceKotehanDropdowns, 100);
    };
  }
}

// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
  // 既存の初期化処理が終わった後にドロップダウンを置き換える
  setTimeout(replaceSelectsWithCustomDropdowns, 300);
});

// ===== 💾 localStorage ユーティリティ =====

// ===== ✅ コピー通知表示 =====
function showNotification(message = 'コピーしました') {
  const notification = document.getElementById('copy-notification');
  if (notification) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 2000);
  }
}
