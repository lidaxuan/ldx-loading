const loadingMap = new WeakMap();

const defaultOptions = {
  text: '',
  fullscreen: true,
  lock: true,
  customClass: '',
  color: '#409EFF',
};

function resolveTarget(el, options = {}) {
  if (el instanceof Event && el.currentTarget) return el.currentTarget;
  if (el instanceof HTMLElement) return el;
  if (options.fullscreen) return document.body;
  return null;
}

function createMask({ el, options }) {
  const parent = resolveTarget(el, options);
  if (!parent) {
    console.warn('[LdxLoading] 找不到挂载容器');
    return;
  }

  if (loadingMap.has(parent)) return;

  const mask = document.createElement('div');
  mask.className = `ldx-loading-mask ${options.customClass}`;

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: options.fullscreen ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.8)',
    zIndex: 9999,
    pointerEvents: 'auto',
  };

  if (options.fullscreen) {
    Object.assign(baseStyle, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    });
  } else {
    Object.assign(baseStyle, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1000,
      cursor: 'not-allowed',
    });

    const parentStyle = getComputedStyle(parent);
    if (parentStyle.position === 'static') {
      parent.style.position = 'relative';
    }
  }

  Object.assign(mask.style, baseStyle);

  const content = document.createElement('div');
  Object.assign(content.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });

  const spinner = document.createElement('div');
  const spinnerSize = options.fullscreen ? 16 : 10;
  Object.assign(spinner.style, {
    width: spinnerSize + 'px',
    height: spinnerSize + 'px',
    border: `${spinnerSize / 12}px solid ${options.color}`,
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'ldx-spin 1s linear infinite',
  });

  content.appendChild(spinner);

  if (options.text) {
    const textEl = document.createElement('div');
    Object.assign(textEl.style, {
      marginTop: options.fullscreen ? '12px' : '4px',
      fontSize: options.fullscreen ? '12px' : '12px',
      color: options.color,
      userSelect: 'none',
    });
    textEl.textContent = options.text;
    content.appendChild(textEl);
  }

  mask.appendChild(content);
  parent.appendChild(mask);

  // 锁定 body 滚动
  if (options.lock && options.fullscreen) {
    document.body.style.overflow = 'hidden';
  }

  // 禁用触发元素
  let triggerButton = null;
  let originalPointerEvents = null;

  if (el instanceof HTMLElement) {
    if (el.tagName === 'BUTTON' || el.type === 'button') {
      el.disabled = true;
      triggerButton = el;
    } else {
      originalPointerEvents = el.style.pointerEvents;
      el.style.pointerEvents = 'none';
    }
  }

  loadingMap.set(parent, { mask, options, triggerButton, originalPointerEvents, el });
}

function removeMask(el) {
  const parent = resolveTarget(el);
  if (!parent) return;

  const record = loadingMap.get(parent);
  if (!record) return;

  const { mask, options, triggerButton, originalPointerEvents, el: targetEl } = record;

  if (mask && parent.contains(mask)) {
    parent.removeChild(mask);
  }

  loadingMap.delete(parent);

  if (options.lock && options.fullscreen) {
    document.body.style.overflow = '';
  }

  if (triggerButton) {
    triggerButton.disabled = false;
  } else if (targetEl && targetEl instanceof HTMLElement) {
    targetEl.style.pointerEvents = originalPointerEvents || '';
  }
}

const LdxLoading = {
  init(userOptions = {}) {
    Object.assign(defaultOptions, userOptions);
  },

  open(elOrEvent, options = {}) {
    const el = resolveTarget(elOrEvent, options);
    if (!el) {
      console.warn('LdxLoading: 找不到挂载元素');
      return;
    }

    createMask({ el, options: Object.assign({}, defaultOptions, options) });
  },

  close(elOrEvent) {
    removeMask(elOrEvent);
  },
};

// 全局样式
if (!document.getElementById('ldx-loading-style')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'ldx-loading-style';
  styleEl.textContent = `
    @keyframes ldx-spin {
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleEl);
}

export default LdxLoading;
