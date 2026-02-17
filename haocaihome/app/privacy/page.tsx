import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 / Privacy Policy | 彩虹奥秘 Rainbow Arcana',
  description: 'Learn how Rainbow Arcana collects, uses, and protects your data on iOS and Android.',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-semibold text-arcana-cream">{title}</h2>
    <div className="space-y-2 text-arcana-gray text-sm leading-relaxed">{children}</div>
  </section>
);

type BilingualText = { zh: string; en: string };

const BilingualList: React.FC<{ items: BilingualText[] }> = ({ items }) => (
  <ul className="list-disc list-inside space-y-2 text-arcana-gray text-sm leading-relaxed">
    {items.map((item) => (
      <li key={item.zh} className="space-y-1">
        <p>{item.zh}</p>
        <p className="opacity-80">{item.en}</p>
      </li>
    ))}
  </ul>
);

const BilingualBlock: React.FC<BilingualText> = ({ zh, en }) => (
  <div className="space-y-1 text-arcana-gray text-sm leading-relaxed">
    <p>{zh}</p>
    <p className="opacity-80">{en}</p>
  </div>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-arcana-charcoal text-arcana-cream grain-overlay px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-arcana-gold">Privacy Policy</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">隐私政策 / Privacy Policy</h1>
          <div className="space-y-1 text-arcana-gray text-sm leading-relaxed">
            <p>最后更新：2026 年 2 月 15 日</p>
            <p className="opacity-80">Last updated: February 15, 2026</p>
          </div>
          <BilingualBlock
            zh="欢迎使用「彩虹奥秘」（Rainbow Arcana）。我们致力于在 iOS 与 Android 平台满足应用商店的隐私要求，并保护您的个人信息安全。本政策说明我们收集哪些数据、如何使用与共享，以及您对数据的控制权。"
            en="Welcome to “Rainbow Arcana.” We comply with App Store and Google Play privacy requirements on iOS and Android and protect your personal information. This notice explains what we collect, how we use and share it, and the controls you have."
          />
        </div>

        <Section title="我们收集哪些信息 / What We Collect">
          <BilingualList
            items={[
              {
                zh: '位置信息：在您授权后获取系统提供的精确或大致位置，用于检测天气/彩虹条件并推送提醒。',
                en: 'Location: precise or approximate location (with your permission) to detect rainbow/weather conditions and send alerts.',
              },
              {
                zh: '设备与日志：设备型号、操作系统版本、应用版本、崩溃日志与性能数据，用于诊断与改进稳定性。',
                en: 'Device & logs: device model, OS/app version, crash and performance data for diagnostics and stability improvements.',
              },
              {
                zh: '通知令牌：由 Apple/Google 提供的推送通知令牌，用于向您的设备发送提醒，不含其他个人身份信息。',
                en: 'Notification token: push tokens from Apple/Google to deliver alerts; they contain no other personal identifiers.',
              },
              {
                zh: '使用数据：功能点击、页面停留等匿名或去标识化的分析事件，用于了解功能是否易用。',
                en: 'Usage data: anonymized or de-identified events (taps, dwell time) to understand usability.',
              },
              {
                zh: '购买与订阅信息：由 App Store / Google Play 提供的交易状态（如是否订阅、到期时间），我们不接触您的完整支付卡信息。',
                en: 'Purchase & subscription info: transaction status from App Store / Google Play (e.g., active, expiry). We do not see your full card details.',
              },
              {
                zh: '您主动提供的内容：当您与我们联系或提交反馈时，可能包含邮箱或描述文本。',
                en: 'Content you provide: email or message text when you contact support or send feedback.',
              },
            ]}
          />
        </Section>

        <Section title="我们如何使用信息 / How We Use Information">
          <BilingualList
            items={[
              {
                zh: '提供核心功能：基于位置的彩虹提醒、塔罗抽牌体验、通知与个性化仪式。',
                en: 'Provide core features: location-based rainbow alerts, tarot draws, notifications, and personalized rituals.',
              },
              {
                zh: '安全与防滥用：检测异常行为、保护服务运行安全。',
                en: 'Security & abuse prevention: detect abnormal behavior and protect service integrity.',
              },
              {
                zh: '改进产品：统计使用趋势、排查崩溃与性能问题，优化设计与可访问性。',
                en: 'Product improvement: analyze trends, troubleshoot crashes/performance, and refine UX/accessibility.',
              },
              {
                zh: '合规计费：验证订阅状态、处理退款或账单争议。',
                en: 'Billing compliance: verify subscriptions and handle refunds or billing disputes.',
              },
              {
                zh: '沟通：回复您的支持请求或重要服务通知（例如政策更新、重大故障）。',
                en: 'Communications: respond to support requests and send important service notices (e.g., policy updates, major outages).',
              },
            ]}
          />
        </Section>

        <Section title="共享与披露 / Sharing & Disclosure">
          <BilingualList
            items={[
              {
                zh: '服务提供商：云托管、分析、崩溃报告、推送通知等第三方仅为代表我们处理信息并受保密约束，不得用于自有营销。',
                en: 'Service providers: cloud hosting, analytics, crash reporting, and push vendors process data on our behalf under confidentiality and may not use it for their own marketing.',
              },
              {
                zh: '平台与支付：Apple App Store 与 Google Play 为处理付款、订阅验证所需信息。',
                en: 'Platforms & billing: Apple App Store and Google Play receive what is needed to process payments and validate subscriptions.',
              },
              {
                zh: '法律合规：在法律要求、执行法律权利或保护用户安全时可能披露必要信息。',
                en: 'Legal compliance: we may disclose necessary information when required by law, to enforce rights, or to protect safety.',
              },
              {
                zh: '不售卖个人信息：我们不向第三方出售或出租个人信息，也不进行基于第三方广告网络的追踪投放。',
                en: 'No sale of personal data: we do not sell or rent personal information and do not run third-party ad network tracking.',
              },
            ]}
          />
        </Section>

        <Section title="权限说明 / Platform Permissions">
          <BilingualList
            items={[
              {
                zh: '位置（可选）：用于检测彩虹出现条件。您可随时在系统设置中变更为“仅使用时”或关闭。',
                en: 'Location (optional): detect rainbow conditions. You can switch to “While Using” or disable anytime in system settings.',
              },
              {
                zh: '通知（可选）：用于发送彩虹提醒与仪式提示。可在系统设置中关闭。',
                en: 'Notifications (optional): deliver rainbow alerts and ritual reminders. Disable anytime in settings.',
              },
              {
                zh: '网络：用于同步天气数据、验证订阅、下载更新内容。',
                en: 'Network: sync weather data, verify subscriptions, and fetch updated content.',
              },
            ]}
          />
        </Section>

        <Section title="数据存储与保留 / Storage & Retention">
          <BilingualBlock
            zh="您的塔罗抽牌记录默认保存在本地设备上，不会上传至我们的服务器。诊断与分析数据仅在达成收集目的所需的最短时间内保存，并定期聚合或删除。法律要求或解决争议所需的记录可能会按规定保留。"
            en="Your tarot draw history stays on your device by default and is not uploaded. Diagnostic and analytics data are kept only as long as necessary and then aggregated or deleted. Records needed for legal compliance or dispute resolution may be retained as required."
          />
        </Section>

        <Section title="您的权利 / Your Choices">
          <BilingualList
            items={[
              {
                zh: '撤回权限：您可在设备设置中随时关闭位置或通知权限。',
                en: 'Withdraw permissions: turn off location or notifications anytime in device settings.',
              },
              {
                zh: '访问与更正：您可通过联系我们获取我们持有的可识别信息并请求更正（如适用）。',
                en: 'Access & correction: contact us to access identifiable data we hold about you and request corrections where applicable.',
              },
              {
                zh: '删除：卸载应用将移除保存在设备上的个人数据。您也可联系支持请求删除我们持有的可识别信息（例如支持工单）。',
                en: 'Deletion: uninstalling removes data stored on your device. You may also request deletion of identifiable data we hold (e.g., support tickets).',
              },
              {
                zh: '拒绝分析：若您不希望被纳入可选分析，可在应用设置或通过邮件提出停用请求。',
                en: 'Opt out of analytics: disable optional analytics in-app (if available) or email us to opt out.',
              },
            ]}
          />
        </Section>

        <Section title="儿童隐私 / Children">
          <BilingualBlock
            zh="本应用面向 13 周岁及以上用户。我们不会有意收集 13 岁以下儿童的个人信息。如发现此类数据，我们会及时删除。"
            en="The app is intended for users 13 years and older. We do not knowingly collect personal data from children under 13; if we learn of such data, we delete it promptly."
          />
        </Section>

        <Section title="国际传输 / International Transfers">
          <BilingualBlock
            zh="您的信息可能会被传输并存储在位于您所在国家/地区之外的服务器上。我们会采取合理措施确保跨境传输符合适用法律并保障信息安全。"
            en="Your data may be transferred to and stored on servers outside your country/region. We take reasonable measures to ensure cross-border transfers comply with applicable laws and safeguard security."
          />
        </Section>

        <Section title="安全性 / Security">
          <BilingualBlock
            zh="我们采用传输加密、访问控制和最小化收集等措施保护信息，但任何互联网传输都存在风险，无法保证绝对安全。"
            en="We use transport encryption, access controls, and data minimization to protect information, but internet transmission carries risk and absolute security cannot be guaranteed."
          />
        </Section>

        <Section title="政策更新 / Changes">
          <BilingualBlock
            zh="当本政策有重大更新时，我们会在应用内或通过通知提示新的生效日期。继续使用即表示您接受更新后的政策。"
            en="We will notify you in-app or via notice of major updates and the new effective date. Continuing to use the app means you accept the updated policy."
          />
        </Section>

        <Section title="联系我们 / Contact Us">
          <BilingualBlock
            zh="如对本政策或隐私实践有疑问、请求或投诉，请通过以下方式联系我们：邮箱 support@haocaihome.com"
            en="For questions, requests, or complaints about this policy or our privacy practices, contact us at: support@haocaihome.com"
          />
        </Section>
      </div>
    </div>
  );
}
