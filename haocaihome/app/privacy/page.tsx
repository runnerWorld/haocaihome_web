import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 | 彩虹奥秘',
  description: '了解彩虹奥秘如何在 iOS 和 Android 平台上收集、使用和保护您的数据。',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-semibold text-arcana-cream">{title}</h2>
    <div className="space-y-2 text-arcana-gray text-sm leading-relaxed">{children}</div>
  </section>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc list-inside space-y-1 text-arcana-gray text-sm leading-relaxed">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-arcana-charcoal text-arcana-cream grain-overlay px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-arcana-gold">Privacy Policy</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">隐私政策 / Privacy Policy</h1>
          <p className="text-arcana-gray text-sm">最后更新：2026 年 2 月 15 日</p>
          <p className="text-arcana-gray text-sm leading-relaxed">
            欢迎使用「彩虹奥秘」（Rainbow Arcana）。我们致力于在 iOS 与 Android 平台满足应用商店的隐私要求，并保护您的个人信息安全。本政策说明我们收集哪些数据、如何使用与共享，以及您对数据的控制权。
          </p>
        </div>

        <Section title="我们收集哪些信息 / What We Collect">
          <List
            items={[
              '位置信息：在您授权后获取系统提供的精确或大致位置，用于检测天气/彩虹条件并推送提醒。',
              '设备与日志：设备型号、操作系统版本、应用版本、崩溃日志与性能数据，用于诊断与改进稳定性。',
              '通知令牌：由 Apple/Google 提供的推送通知令牌，用于向您的设备发送提醒，不含其他个人身份信息。',
              '使用数据：功能点击、页面停留等匿名或去标识化的分析事件，用于了解功能是否易用。',
              '购买与订阅信息：由 App Store / Google Play 提供的交易状态（如是否订阅、到期时间），我们不接触您的完整支付卡信息。',
              '您主动提供的内容：当您与我们联系或提交反馈时，可能包含邮箱或描述文本。',
            ]}
          />
        </Section>

        <Section title="我们如何使用信息 / How We Use Information">
          <List
            items={[
              '提供核心功能：基于位置的彩虹提醒、塔罗抽牌体验、通知与个性化仪式。',
              '安全与防滥用：检测异常行为、保护服务运行安全。',
              '改进产品：统计使用趋势、排查崩溃与性能问题，优化设计与可访问性。',
              '合规计费：验证订阅状态、处理退款或账单争议。',
              '沟通：回复您的支持请求或重要服务通知（例如政策更新、重大故障）。',
            ]}
          />
        </Section>

        <Section title="共享与披露 / Sharing & Disclosure">
          <List
            items={[
              '服务提供商：云托管、分析、崩溃报告、推送通知等第三方仅为代表我们处理信息并受保密约束，不得用于自有营销。',
              '平台与支付：Apple App Store 与 Google Play 为处理付款、订阅验证所需信息。',
              '法律合规：在法律要求、执行法律权利或保护用户安全时可能披露必要信息。',
              '不售卖个人信息：我们不向第三方出售或出租个人信息，也不进行基于第三方广告网络的追踪投放。',
            ]}
          />
        </Section>

        <Section title="权限说明 / Platform Permissions">
          <List
            items={[
              '位置（可选）：用于检测彩虹出现条件。您可随时在系统设置中变更为“仅使用时”或关闭。',
              '通知（可选）：用于发送彩虹提醒与仪式提示。可在系统设置中关闭。',
              '网络：用于同步天气数据、验证订阅、下载更新内容。',
            ]}
          />
        </Section>

        <Section title="数据存储与保留 / Storage & Retention">
          <div className="space-y-2 text-arcana-gray text-sm leading-relaxed">
            <p>您的塔罗抽牌记录默认保存在本地设备上，不会上传至我们的服务器。</p>
            <p>诊断与分析数据仅在达成收集目的所需的最短时间内保存，并定期聚合或删除。法律要求或解决争议所需的记录可能会按规定保留。</p>
          </div>
        </Section>

        <Section title="您的权利 / Your Choices">
          <List
            items={[
              '撤回权限：您可在设备设置中随时关闭位置或通知权限。',
              '访问与更正：您可通过联系我们获取我们持有的可识别信息并请求更正（如适用）。',
              '删除：卸载应用将移除保存在设备上的个人数据。您也可联系支持请求删除我们持有的可识别信息（例如支持工单）。',
              '拒绝分析：若您不希望被纳入可选分析，可在应用设置或通过邮件提出停用请求。',
            ]}
          />
        </Section>

        <Section title="儿童隐私 / Children">
          <p>本应用面向 13 周岁及以上用户。我们不会有意收集 13 岁以下儿童的个人信息。如发现此类数据，我们会及时删除。</p>
        </Section>

        <Section title="国际传输 / International Transfers">
          <p>您的信息可能会被传输并存储在位于您所在国家/地区之外的服务器上。我们会采取合理措施确保跨境传输符合适用法律并保障信息安全。</p>
        </Section>

        <Section title="安全性 / Security">
          <p>我们采用传输加密、访问控制和最小化收集等措施保护信息，但任何互联网传输都存在风险，无法保证绝对安全。</p>
        </Section>

        <Section title="政策更新 / Changes">
          <p>当本政策有重大更新时，我们会在应用内或通过通知提示新的生效日期。继续使用即表示您接受更新后的政策。</p>
        </Section>

        <Section title="联系我们 / Contact Us">
          <div className="space-y-1 text-arcana-gray text-sm leading-relaxed">
            <p>如对本政策或隐私实践有疑问、请求或投诉，请通过以下方式联系我们：</p>
            <p>邮箱：support@haocaihome.com</p>
          </div>
        </Section>
      </div>
    </div>
  );
}
